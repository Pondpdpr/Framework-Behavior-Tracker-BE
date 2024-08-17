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
  gender: string;

  @Column({ type: 'varchar', length: 20, default: '-' })
  group: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  position: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  directSuperior: string;

  @Column({ type: 'varchar', length: 50, default: '-' })
  location: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  dealership: string;

  @Column({ type: 'varchar', length: 20, default: '-' })
  phone: string;

  @Column({ type: 'varchar', length: 30, default: '-' })
  market: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'is_submitted', type: 'boolean', nullable: true })
  isSubmitted: boolean;

  @Column({
    type: 'enum',
    enum: EmailActivityStatus,
    nullable: true,
  })
  dailyEmailActivityStatus: EmailActivityStatus;

  @Column({
    type: 'enum',
    enum: EmailActivityStatus,
    nullable: true,
  })
  reminderEmailActivityStatus: EmailActivityStatus;

  @OneToMany(() => Response, (response) => response.userId)
  responses: Response[];
}
