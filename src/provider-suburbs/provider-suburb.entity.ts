import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Provider } from '../providers/provider.entity';
import { Suburb } from '../suburbs/suburb.entity';

@Entity('provider_suburbs')
export class ProviderSuburb {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @Column()
    suburb_id: string;

    @ManyToOne(() => Provider, (provider) => provider.providerSuburbs, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @ManyToOne(() => Suburb, (suburb) => suburb.providerSuburbs, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'suburb_id' })
    suburb: Suburb;

    @CreateDateColumn()
    created_at: Date;
}
