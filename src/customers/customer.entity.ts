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

@Entity('customers')
export class Customer {
    @PrimaryColumn('uuid')
    id: string;

    @OneToOne(() => Profile, (profile) => profile.customer, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    profile: Profile;

    @Column({ type: 'text', default: 'email' })
    preferred_contact_method: 'email' | 'phone';

    @Column({ type: 'date', nullable: true })
    date_of_birth?: Date;

    @Column({ type: 'text', nullable: true })
    gender?: 'male' | 'female' | 'other';

    @OneToMany(() => CustomerAddress, (address) => address.customer, { cascade: true })
    addresses: CustomerAddress[];

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
