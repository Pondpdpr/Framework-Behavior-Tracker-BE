import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRuleDto, RuleQueryDto, UpdateRuleDto } from './dto/request.dto';
import { Rule, RuleType } from './entities/rule.entity';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
  ) {}

  async create(createRuleDto: CreateRuleDto) {
    const rule = this.ruleRepository.create(createRuleDto);
    return await this.ruleRepository.save(rule);
  }

  async findAll(query: RuleQueryDto) {
    const qb = this.ruleRepository
      .createQueryBuilder('r')
      .orderBy('rule', 'ASC');

    if (query?.isReminder === 'true') {
      qb.where('r.rule = :ruleType', { ruleType: RuleType.REMINDER });
    } else if (query?.isReminder === 'false') {
      qb.where('NOT r.rule = :ruleType', { ruleType: RuleType.REMINDER });
    }

    return await qb.getMany();
  }

  async update(id: number, updateRuleDto: UpdateRuleDto) {
    const existingRule = await this.ruleRepository.findOneBy({ id });
    if (!existingRule) {
      throw new BadRequestException();
    }
    await this.ruleRepository.update({ id }, updateRuleDto);
    return { ...existingRule, ...updateRuleDto };
  }

  async remove(id: number) {
    const existingRule = await this.ruleRepository.findOneBy({ id });
    if (!existingRule) {
      throw new BadRequestException();
    }
    await this.ruleRepository.delete({ id });
    return existingRule;
  }
}
