import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Provider } from '../providers/provider.entity';

@Entity('profiles')
export class Profile {
    // Note: Supabase auth.users already manages this UUID.
    @PrimaryColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: true })
    email?: string;

    @Column({ nullable: true })
    phone_number?: string;

    @Column({
        type: 'text',
        default: 'customer',
    })
    role: 'customer' | 'provider' | 'admin' | 'superadmin' | 'staff';

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updated_at: Date;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    first_name?: string;

    @Column({ nullable: true })
    last_name?: string;

    @Column({ nullable: false, default: false })
    isActive?: boolean;

    @OneToOne(() => Provider, (provider) => provider.profile)
    provider?: Provider;
}
