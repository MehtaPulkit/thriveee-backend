import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { ServiceCategory } from 'src/service-categories/service-categories.entity';
import { ServiceSubcategory } from 'src/service-subcategories/service-subcategories.entity';
import { ProviderService } from 'src/provider-services/provider-service.entity';

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'numeric', nullable: true })
    base_price?: number;

    @Column({ type: 'text', default: 'flat' })
    pricing_strategy: string;

    @Column({ type: 'boolean', default: false })
    is_inspection_required: boolean;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @ManyToOne(() => ServiceCategory, (category) => category.services, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'category_id' })
    category: ServiceCategory;

    @ManyToOne(() => ServiceSubcategory, (subcategory) => subcategory.services, {
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'subcategory_id' })
    subcategory: ServiceSubcategory;

    @OneToMany(() => ProviderService, (providerService) => providerService.service)
    providerServices: ProviderService[];
}
