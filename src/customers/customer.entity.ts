import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../profiles/profile.entity';
import { CustomerAddress } from '../customer-addresses/customer-address.entity';
import { Order } from '../orders/order.entity';

@Entity('customers')
export class Customer {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Profile, (profile) => profile.customer, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    profile: Profile;

    @Column({ type: 'date', nullable: true })
    date_of_birth?: Date;

    @Column({ type: 'text', nullable: true })
    gender?: 'male' | 'female' | 'other';

    @Column({ type: 'boolean', default: true })
    email_notifications_enabled: boolean;

    @Column({ type: 'boolean', default: false })
    sms_notifications_enabled: boolean;

    @Column({ type: 'boolean', default: false })
    marketing_communications_enabled: boolean;

    @OneToMany(() => CustomerAddress, (address) => address.customer, { cascade: true })
    addresses: CustomerAddress[];
    @OneToMany(() => Order, (order) => order.customer, { cascade: true })
    orders: Order[];
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
