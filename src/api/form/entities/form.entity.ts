import { Question } from 'src/api/question/entities/question.entity';
import { Response } from 'src/api/response/entities/response.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  date: Date;

  @OneToMany(() => Response, (response) => response.form)
  responses: Response[];

  @OneToMany(() => Question, (question) => question.formId, {
    cascade: true,
  })
  questions: Question[];
}
