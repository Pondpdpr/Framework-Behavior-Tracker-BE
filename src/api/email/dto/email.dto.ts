import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SendEmailDto {
  @ApiPropertyOptional({ type: [Number] })
  @IsArray()
  users?: number[];
}
