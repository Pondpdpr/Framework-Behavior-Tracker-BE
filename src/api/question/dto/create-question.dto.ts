import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BehaviorType } from '../entities/question.entity';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ enum: BehaviorType })
  @IsNotEmpty()
  behavior: BehaviorType;
}
