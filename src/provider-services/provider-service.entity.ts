import { Provider } from '../providers/provider.entity';
import { Service } from '../services/services.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';

@Entity('provider_services')
export class ProviderService {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @Column()
    service_id: string;

    @ManyToOne(() => Provider, (provider) => provider.providerServices, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @ManyToOne(() => Service, (service) => service.providerServices, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @Column({ type: 'numeric', nullable: true })
    price_override: number;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;
}
