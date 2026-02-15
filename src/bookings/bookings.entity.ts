// booking.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { BookingStatus } from './booking-status.enum';
import { Provider } from 'src/providers/provider.entity';
import { Service } from 'src/services/services.entity';
import { Order } from 'src/orders/order.entity';

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    customer_id: string;

    @Column({ type: 'uuid', nullable: true })
    service_id: string;

    @Column({ type: 'uuid', nullable: true })
    provider_id: string;

    @Column({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.DRAFT,
    })
    status: BookingStatus;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @Column({ type: 'uuid', nullable: true })
    address_id: string;

    @Column({ type: 'numeric', nullable: true })
    total_amount: number;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'uuid', nullable: true })
    order_id: string;

    @Column({ type: 'date', nullable: true })
    scheduled_date: Date;

    @Column({ type: 'text', nullable: true })
    time_slot: string;

    @Column({ type: 'jsonb', nullable: true })
    price_breakdown: Record<string, any>;

    @Column({ type: 'numeric', nullable: true })
    final_price: number;

    @ManyToOne(() => Order, { nullable: true })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Provider, { nullable: true })
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @ManyToOne(() => Service, { nullable: true })
    @JoinColumn({ name: 'service_id' })
    service: Service;
}
