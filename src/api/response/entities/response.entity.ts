import { Answer } from 'src/api/answer/entities/answer.entity';
import { Form } from 'src/api/form/entities/form.entity';
import { User } from 'src/api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.responses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', name: 'form_id' })
  formId: number;

  @ManyToOne(() => Form, (form) => form.responses)
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @OneToMany(() => Answer, (answer) => answer.responseId, { cascade: true })
  answers: Answer[];
}
