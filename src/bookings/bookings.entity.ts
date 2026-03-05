import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerAddress } from '../customer-addresses/customer-address.entity';
import { Customer } from '../customers/customer.entity';
import { Order } from '../orders/order.entity';
import { Provider } from '../providers/provider.entity';
import { Service } from '../services/services.entity';
import { BookingStatus } from './booking-status.enum';

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Internal sequential number for human-readable IDs
     */
    @Column({
        type: 'integer',
        generated: 'increment',
        unique: true
    })
    @Index('idx_bookings_booking_number')
    booking_number: number;

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

    @Column({
        type: 'numeric',
        nullable: true,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => value ? parseFloat(value) : null
        }
    })
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

    @Column({
        type: 'numeric',
        nullable: true,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => value ? parseFloat(value) : null
        }
    })
    final_price: number;

    // --- Relations ---

    @ManyToOne(() => Order, { nullable: true })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Provider, { nullable: true })
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @ManyToOne(() => Service, { nullable: true })
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @ManyToOne(() => Customer, { nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => CustomerAddress, { nullable: true })
    @JoinColumn({ name: 'address_id' })
    address: CustomerAddress;

    /**
     * Virtual Display ID
     * Example: 1005 -> "BKN-001005"
     */
    get display_id(): string {
        if (!this.booking_number) return '';
        return `BKN-${this.booking_number.toString().padStart(6, '0')}`;
    }

    toJSON() {
        return {
            ...this,
            display_id: this.display_id,
        };
    }
}