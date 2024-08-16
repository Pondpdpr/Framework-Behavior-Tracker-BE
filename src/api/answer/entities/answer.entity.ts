import { Question } from 'src/api/question/entities/question.entity';
import { Response } from 'src/api/response/entities/response.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Response, (response) => response.answers)
  @JoinColumn({ name: 'response_id' })
  responseId: Response;

  @Column({ type: 'int', name: 'question_id' })
  questionId: number;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column({ type: 'boolean' })
  answer: boolean;
}
