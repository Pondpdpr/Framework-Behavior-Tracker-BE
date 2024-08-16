import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { BehaviorType } from 'src/api/question/entities/question.entity';

export class CreateTemplateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ enum: BehaviorType })
  @IsNotEmpty()
  behavior: BehaviorType;
}

export class UpdateTemplateQuestionDto extends PartialType(
  CreateTemplateQuestionDto,
) {
  @ApiPropertyOptional()
  @IsBoolean()
  isActive: boolean;
}
