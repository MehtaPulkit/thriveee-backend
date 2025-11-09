import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Customer } from '../customers/customer.entity';

@Entity('customer_addresses')
export class CustomerAddress {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, (customer) => customer.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({ type: 'uuid' })
    customer_id: string;

    @Column({ type: 'text', nullable: true })
    label?: string;

    @Column({ type: 'text' })
    address_line_1: string;

    @Column({ type: 'text', nullable: true })
    address_line_2?: string;

    @Column({ type: 'text' })
    suburb: string;

    @Column({ type: 'text' })
    state: string;

    @Column({ type: 'text' })
    postcode: string;

    @Column({ type: 'text', default: 'Australia' })
    country: string;

    @Column({ type: 'boolean', default: false })
    is_default: boolean;

    @Column({ type: 'numeric', nullable: true })
    latitude?: number;

    @Column({ type: 'numeric', nullable: true })
    longitude?: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
