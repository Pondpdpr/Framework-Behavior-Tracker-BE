import { ApiProperty } from '@nestjs/swagger';
import { BehaviorType } from 'src/api/question/entities/question.entity';

export class TemplateQuestionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  question: string;

  @ApiProperty({ enum: BehaviorType })
  behavior: BehaviorType;

  @ApiProperty()
  isActive: boolean;
}
