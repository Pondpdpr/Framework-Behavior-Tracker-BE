import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  answer: boolean;
}
