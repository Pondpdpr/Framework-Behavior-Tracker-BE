import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { decryptToken } from 'util/encryption';
import { Question } from '../question/entities/question.entity';
import { TemplateQuestion } from '../templateQuestion/entities/templateQuestion.entity';
import { User } from '../user/entities/user.entity';
import { Form } from './entities/form.entity';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
    @InjectRepository(TemplateQuestion)
    private readonly templateQuestionRepository: Repository<TemplateQuestion>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create() {
    const questions: Partial<Question>[] = await this.templateQuestionRepository
      .createQueryBuilder('tq')
      .select(['tq.question', 'tq.behavior'])
      .where('tq.isActive = TRUE')
      .orderBy('tq.id', 'ASC')
      .getMany();
    const form = this.formRepository.create({ questions });
    await this.userRepository.update({}, { isSubmitted: false });
    return this.formRepository.save(form);
  }

  async findOne(id: number) {
    const qb = this.formRepository.createQueryBuilder('f');
    const result = await qb
      .leftJoinAndSelect('f.questions', 'q')
      .where('f.id = :id', { id })
      .getMany();
    return result;
  }

  async findLatest() {
    const result = await this.formRepository.find({
      relations: { responses: true },
      order: { date: 'DESC' },
      take: 1,
    });
    return result[0];
  }

  async findResponseOfThreeLatest(skip = 0) {
    const result = await this.formRepository.find({
      relations: { responses: true },
      order: { id: 'DESC' },
      take: 3,
      skip,
    });
    return result;
  }

  async findOneForUser(token: string) {
    try {
      const info = decryptToken(token);
      const user = await this.userRepository.findOne({
        where: { id: info.userId },
      });
      const latestForm = await this.formRepository
        .createQueryBuilder('f')
        .clone()
        .leftJoinAndSelect('f.questions', 'q')
        .orderBy('f.id', 'DESC')
        .getOne();
      if (latestForm.id !== info.formId) {
        throw new BadRequestException('form has Expired');
      }
      return { user, form: latestForm };
    } catch (e) {
      throw e;
    }
  }
}
