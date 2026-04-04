import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from '../services/services.entity';

@Entity('service_multipliers')
export class ServiceMultiplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Service, (service) => service.multipliers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column('text')
  name: string;

  @Column('text')
  code: string;

  @Column('text')
  type: string;

  @Column('text')
  applies_to: string;

  @Column('int')
  value: number;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
