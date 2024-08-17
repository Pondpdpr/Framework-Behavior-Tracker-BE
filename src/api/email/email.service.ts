import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { encryptToken } from 'util/encryption';
import { Form } from '../form/entities/form.entity';
import { FormService } from '../form/form.service';
import { Rule, RuleCondition, RuleType } from '../rule/entities/rule.entity';
import { EmailActivityStatus, User } from '../user/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly formService: FormService,
  ) {}

  async sendMail(message: string, user: User, subject: string) {
    try {
      await this.mailService.sendMail({
        from: 'tracker@frameworks-group.com',
        to: user.email,
        subject,
        html: message,
      });
    } catch (e) {
      console.log(e);
    }
  }

  injectMessage(text: string, user: User) {
    let newText = text;
    for (const [key, value] of Object.entries(user)) {
      newText = newText.replaceAll(`{{${key}}}`, value);
    }
    return newText;
  }

  async createAndSendMail(rule: Rule, user: User, form: Form) {
    const toAllRule = await this.ruleRepository.findOne({
      where: {
        rule: RuleType.TO_ALL,
      },
    });

    let subject = '';
    if (rule.rule === RuleType.REMINDER) {
      subject = `แจ้งเตือน: ${user.firstName} อย่าลืมส่ง Frontline Tracker สำหรับ${new Date(form.date).toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })}`;
    } else {
      subject = `สวัสดี ${user.firstName}! Frontline Tracker ของคุณสำหรับ${new Date(form.date).toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })} พร้อมแล้ว 🙂`;
    }

    let emailMessage = `<div><div style="white-space: pre">${rule.text}`;
    const token = encryptToken({ userId: user.id, formId: form.id });

    if (toAllRule.isActive && rule.rule !== RuleType.REMINDER)
      emailMessage += `\n\n${toAllRule.text}`;
    emailMessage += `\n\n${process.env.FRONTEND_HOST}/user/${token}`;
    emailMessage = this.injectMessage(emailMessage, user);
    emailMessage += `\n\nทีมงาน Frontline Tracker\n\n</div><img src="https://behavior-tracker-prach.s3.ap-southeast-1.amazonaws.com/logo.png" alt="Framework logo" height="auto" width="150px"/></div>`;

    try {
      this.sendMail(emailMessage, user, subject);
      if (rule.rule === RuleType.REMINDER) {
        await this.userRepository.update(
          { id: user.id },
          {
            reminderEmailActivityStatus: EmailActivityStatus.EMAIL_DELIVERED,
          },
        );
      } else {
        await this.userRepository.update(
          { id: user.id },
          {
            dailyEmailActivityStatus: EmailActivityStatus.EMAIL_DELIVERED,
          },
        );
      }
    } catch (error) {
      await this.userRepository.update(
        { id: user.id },
        {
          dailyEmailActivityStatus: EmailActivityStatus.EMAIL_FAILED,
        },
      );
    }
  }

  async sendAllMail(users?: number[]) {
    const activeRules = await this.ruleRepository.find({
      where: {
        isActive: true,
        rule: Not(In([RuleType.DEFAULT, RuleType.TO_ALL])),
      },
    });
    const defaultRule = await this.ruleRepository.findOne({
      where: {
        rule: RuleType.DEFAULT,
      },
    });

    const activeUsers = (
      users
        ? await this.userRepository.findBy({ id: In(users) })
        : await this.userRepository.findBy({ isActive: true })
    ).map((user) => ({
      ...user,
      responseStatus: 0,
      sent: false,
    }));

    const formResponses = (
      await this.formService.findResponseOfThreeLatest(users ? 1 : 0)
    ).map((form) => {
      const userRespond = new Set();
      form.responses.map((response) => {
        userRespond.add(response.userId);
      });
      return { ...form, userRespond };
    });

    activeUsers.map((user) => {
      formResponses.map((form, index) => {
        if (form.userRespond.has(user.id)) user.responseStatus += 10 ** index;
      });
    });

    let todayForm: Form;

    if (!users) {
      todayForm = await this.formService.create();
      this.userRepository.update({}, { reminderEmailActivityStatus: null });
    } else {
      todayForm = await this.formService.findLatest();
    }

    await Promise.all(
      activeRules.map(async (rule) => {
        await Promise.all(
          activeUsers
            .filter(
              (user) =>
                user.responseStatus === RuleCondition[rule.rule] && !user.sent,
            )
            .map(async (user) => {
              try {
                user.sent = true;
                await this.createAndSendMail(rule, user, todayForm);
              } catch (e) {
                console.log(e);
              }
            }),
        );
      }),
    );

    await Promise.all(
      activeUsers
        .filter((user) => !user.sent)
        .map(async (user) => {
          user.sent = true;
          this.createAndSendMail(defaultRule, user, todayForm);
        }),
    );
  }

  async sendRule(ruleId: number) {
    const rule = await this.ruleRepository.findOne({
      where: {
        id: ruleId,
      },
    });

    const activeUsers = (
      await this.userRepository.findBy({ isActive: true })
    ).map((user) => ({
      ...user,
      responseStatus: 0,
    }));

    const formResponses = (
      await this.formService.findResponseOfThreeLatest()
    ).map((form) => {
      const userRespond = new Set();
      form.responses.map((response) => {
        userRespond.add(response.userId);
      });
      return { ...form, userRespond };
    });

    activeUsers.map((user) => {
      formResponses.map((form, index) => {
        if (form.userRespond.has(user.id)) user.responseStatus += 10 ** index;
      });
    });
    await Promise.all(
      activeUsers
        .filter((user) => user.responseStatus === RuleCondition[rule.rule])
        .map(async (user) => {
          try {
            await this.userRepository.update(user.id, {
              dailyEmailActivityStatus: EmailActivityStatus.EMAIL_SENDING,
            });
            await this.createAndSendMail(rule, user, formResponses[0]);
          } catch (e) {
            console.log(e);
          }
        }),
    );
  }

  async sendReminder(users?: number[]) {
    const reminderRule = await this.ruleRepository.findOne({
      where: {
        rule: RuleType.REMINDER,
      },
    });

    const activeUsers = users
      ? await this.userRepository.findBy({ id: In(users) })
      : await this.userRepository.findBy({ isActive: true });

    const todayForm = await this.formService.findLatest();

    const userResponded = todayForm.responses.map(
      (response) => response.userId,
    );

    await Promise.all(
      activeUsers
        .filter((user) => users || !userResponded.includes(user.id))
        .map(async (user) => {
          try {
            await this.userRepository.update(user.id, {
              reminderEmailActivityStatus: EmailActivityStatus.EMAIL_SENDING,
            });
            await this.createAndSendMail(reminderRule, user, todayForm);
          } catch (e) {
            console.log(e);
          }
        }),
    );
  }
}
