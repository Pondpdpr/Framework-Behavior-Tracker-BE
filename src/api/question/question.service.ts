import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from '../form/entities/form.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const form: Form = await this.formRepository.findOneBy({ id: 1 });
    const question: Question = this.questionRepository.create({
      formId: form,
      ...createQuestionDto,
    });
    return this.questionRepository.save(question);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const existingQuestion = await this.questionRepository.findOneBy({ id });
    if (!existingQuestion) {
      throw new BadRequestException();
    }
    await this.questionRepository.update({ id }, updateQuestionDto);
    return { ...existingQuestion, ...updateQuestionDto };
  }

  async remove(id: number) {
    const existingQuestion = await this.questionRepository.findOneBy({ id });
    if (!existingQuestion) {
      throw new BadRequestException();
    }
    await this.questionRepository.delete({ id });
    return existingQuestion;
  }
}
