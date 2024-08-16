import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  CreateTemplateQuestionDto,
  UpdateTemplateQuestionDto,
} from './dto/request.dto';
import { TemplateQuestionDto } from './dto/response.dto';
import { TemplateQuestionService } from './templateQuestion.service';

@Controller('template-question')
export class TemplateQuestionController {
  constructor(
    private readonly templateQuestionService: TemplateQuestionService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [TemplateQuestionDto] })
  get() {
    return this.templateQuestionService.findAll();
  }

  @Post()
  @ApiOkResponse({ type: TemplateQuestionDto })
  create(@Body() createTemplateQuestionDto: CreateTemplateQuestionDto) {
    return this.templateQuestionService.create(createTemplateQuestionDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TemplateQuestionDto })
  update(
    @Param('id') id: string,
    @Body() updateTemplateQuestionDto: UpdateTemplateQuestionDto,
  ) {
    return this.templateQuestionService.update(+id, updateTemplateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateQuestionService.remove(+id);
  }
}
