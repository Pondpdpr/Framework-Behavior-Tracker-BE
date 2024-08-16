import { BehaviorType } from 'src/api/question/entities/question.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TemplateQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  question: string;

  @Column({ type: 'enum', enum: BehaviorType })
  behavior: BehaviorType;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
