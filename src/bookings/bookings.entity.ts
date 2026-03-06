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

// Import or define your Enums here
export enum CleaningType {
    STANDARD = 'standard_cleaning',
    DEEP = 'deep_cleaning',
    END_OF_LEASE = 'end_of_lease_cleaning',
    SPRING = 'spring_cleaning',
}

export enum PropertyType {
    HOUSE = 'house',
    APARTMENT = 'apartment',
    TOWNHOUSE = 'townhouse',
    GRANNY_FLAT = 'granny-flat',
}

export enum PropertyCondition {
    LIGHT = 'light',
    MEDIUM = 'medium',
    HEAVY = 'heavy',
}

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    // --- New Fields ---

    @Column({
        type: 'text', // Matches your DB 'text' type with CHECK constraint
        nullable: true,
    })
    cleaning_type: CleaningType;

    @Column({
        type: 'text',
        nullable: true,
    })
    property_type: PropertyType;

    @Column({
        type: 'integer',
        nullable: true,
        default: 1,
    })
    storeys: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    property_condition: PropertyCondition;

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