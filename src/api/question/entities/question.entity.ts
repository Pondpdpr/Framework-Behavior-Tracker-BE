import { Answer } from 'src/api/answer/entities/answer.entity';
import { Form } from 'src/api/form/entities/form.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum BehaviorType {
  SALES_LEAD_MANAGEMENT = 'P1',
  CUSTOMER_LOGGING = 'P2',
  STS_SALES_FUNNEL_MANAGEMENT = 'P3',
  SALES_MEETING_OPTIMISATION = 'P4',
  TIME_MANAGEMENT = 'P5',
  SALES_PRESENTATION = 'S1',
  CLOSING_TECHNIQUES = 'S2',
  CUSTOMER_FOLLOW_UPS = 'S3',
  OBJECTION_HANDLING = 'S4',
  USING_SCRIPTS = 'S5',
  CUSTOMERS_NAME_X5 = 'B1',
  GESTURES = 'B2',
  EYE_CONTACT = 'B3',
  TONE_OF_VOICE = 'B4',
  ACTIVE_MINDFUL_LISTENING = 'B5',
  TESTING = 'X',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Form, (form) => form.responses)
  @JoinColumn({ name: 'form_id' })
  formId: Form;

  @Column({ type: 'varchar' })
  question: string;

  @Column({ type: 'enum', enum: BehaviorType })
  behavior: BehaviorType;

  @OneToMany(() => Answer, (answer) => answer.questionId)
  answers?: Answer[];
}
