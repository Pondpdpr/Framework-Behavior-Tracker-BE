import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateRuleDto, RuleQueryDto, UpdateRuleDto } from './dto/request.dto';
import { RuleDto } from './dto/response.dto';
import { RuleService } from './rule.service';

@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Post()
  @ApiOkResponse({ type: RuleDto })
  create(@Body() createRuleDto: CreateRuleDto) {
    return this.ruleService.create(createRuleDto);
  }

  @Get()
  @ApiOkResponse({ type: [RuleDto] })
  findAll(@Query() query: RuleQueryDto) {
    return this.ruleService.findAll(query);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RuleDto })
  update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
    return this.ruleService.update(+id, updateRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruleService.remove(+id);
  }
}
