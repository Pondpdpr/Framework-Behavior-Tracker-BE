import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { CreateAnswerDto } from 'src/api/answer/dto/create-answer.dto';

export class CreateResponseDto {
  @ApiProperty({ type: [CreateAnswerDto] })
  @IsArray()
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
