import { Response } from 'src/api/response/entities/response.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum EmailActivityStatus {
  EMAIL_SENDING = 'sending',
  EMAIL_DELIVERED = 'delivered',
  EMAIL_FAILED = 'failed',
  OPENED = 'opened',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, default: '-' })
  firstName: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  lastName: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  thaiFirstName: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  thaiLastName: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 20, default: '-' })
  title: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  department: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  company: string;

  @Column({ type: 'varchar', length: 50, default: '-' })
  location: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  market: string;

  @OneToMany(() => Response, (response) => response.userId)
  responses: Response[];

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: EmailActivityStatus,
    default: EmailActivityStatus.EMAIL_FAILED,
  })
  dailyEmailActivityStatus: EmailActivityStatus;

  @Column({
    type: 'enum',
    enum: EmailActivityStatus,
    default: EmailActivityStatus.EMAIL_FAILED,
  })
  reminderEmailActivityStatus: EmailActivityStatus;
}
