import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { RuleType } from '../entities/rule.entity';

export class CreateRuleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  rule: RuleType;
}

export class UpdateRuleDto extends PartialType(CreateRuleDto) {
  @ApiPropertyOptional()
  @IsBoolean()
  isActive: boolean;
}

export class RuleQueryDto {
  @ApiPropertyOptional()
  @IsString()
  isReminder?: string;
}
