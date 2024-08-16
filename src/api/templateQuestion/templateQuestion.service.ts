import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTemplateQuestionDto,
  UpdateTemplateQuestionDto,
} from './dto/request.dto';
import { TemplateQuestion } from './entities/templateQuestion.entity';

@Injectable()
export class TemplateQuestionService {
  constructor(
    @InjectRepository(TemplateQuestion)
    private readonly templateQuestionRepository: Repository<TemplateQuestion>,
  ) {}

  async findAll() {
    return await this.templateQuestionRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async create(createTemplateQuestionDto: CreateTemplateQuestionDto) {
    const templateQuestion: TemplateQuestion =
      this.templateQuestionRepository.create(createTemplateQuestionDto);
    return this.templateQuestionRepository.save(templateQuestion);
  }

  async update(
    id: number,
    updateTemplateQuestionDto: UpdateTemplateQuestionDto,
  ) {
    const existingTemplateQuestion =
      await this.templateQuestionRepository.findOneBy({ id });
    if (!existingTemplateQuestion) {
      throw new BadRequestException();
    }
    await this.templateQuestionRepository.update(
      { id },
      updateTemplateQuestionDto,
    );
    return { ...existingTemplateQuestion, ...updateTemplateQuestionDto };
  }

  async remove(id: number) {
    const existingTemplateQuestion =
      await this.templateQuestionRepository.findOneBy({ id });
    if (!existingTemplateQuestion) {
      throw new BadRequestException();
    }
    await this.templateQuestionRepository.delete({ id });
    return existingTemplateQuestion;
  }
}
