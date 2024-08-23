import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './answer/answer.service';
import { Answer } from './answer/entities/answer.entity';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { ExportController } from './export/export.controller';
import { ExportService } from './export/export.service';
import { Form } from './form/entities/form.entity';
import { FormController } from './form/form.controller';
import { FormService } from './form/form.service';
import { Question } from './question/entities/question.entity';
import { QuestionService } from './question/question.service';
import { Response } from './response/entities/response.entity';
import { ResponseController } from './response/response.controller';
import { ResponseService } from './response/response.service';
import { Rule } from './rule/entities/rule.entity';
import { RuleController } from './rule/rule.controller';
import { RuleService } from './rule/rule.service';
import { TemplateQuestion } from './templateQuestion/entities/templateQuestion.entity';
import { TemplateQuestionController } from './templateQuestion/templateQuestion.controller';
import { TemplateQuestionService } from './templateQuestion/templateQuestion.service';
import { User } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Response,
      Form,
      Answer,
      Question,
      TemplateQuestion,
      Rule,
    ]),
  ],
  controllers: [
    UserController,
    ResponseController,
    FormController,
    TemplateQuestionController,
    RuleController,
    EmailController,
    ExportController,
  ],
  providers: [
    UserService,
    ResponseService,
    FormService,
    AnswerService,
    QuestionService,
    TemplateQuestionService,
    RuleService,
    EmailService,
    ExportService,
  ],
})
export class ApiModule {}
