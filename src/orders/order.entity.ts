import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from './order-status.enum';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    customer_id: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.DRAFT,
    })
    status: OrderStatus;

    @Column({ type: 'numeric', default: 0 })
    total_amount: number;

    @Column({ default: 'AUD' })
    currency: string;

    @Column({ nullable: true })
    stripe_payment_intent_id: string;

    @Column({ type: 'timestamptz', nullable: true })
    paid_at: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

}
