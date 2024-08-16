import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RuleType {
  DEFAULT = 'default',
  TO_ALL = 'to all',
  RULE_1 = 'rule 1',
  RULE_2 = 'rule 2',
  RULE_3 = 'rule 3',
  RULE_4 = 'rule 4',
  RULE_5 = 'rule 5',
  RULE_6 = 'rule 6',
  RULE_7 = 'rule 7',
  RULE_8 = 'rule 8',
  REMINDER = 'reminder',
}

export const RuleCondition = {
  'rule 1': 111,
  'rule 2': 11,
  'rule 3': 101,
  'rule 4': 1,
  'rule 5': 110,
  'rule 6': 10,
  'rule 7': 100,
  'rule 8': 0,
};

@Entity()
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'enum', enum: RuleType })
  rule: RuleType;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
