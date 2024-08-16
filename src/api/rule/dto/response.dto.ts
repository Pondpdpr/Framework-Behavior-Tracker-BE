import { ApiProperty } from '@nestjs/swagger';
import { RuleType } from '../entities/rule.entity';

export class RuleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty({ enum: RuleType })
  rule: RuleType;

  @ApiProperty()
  isActive: boolean;
}
