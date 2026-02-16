import { ServiceCategory } from '../service-categories/service-categories.entity';
import { Service } from '../services/services.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';

@Entity('service_subcategories')
export class ServiceSubcategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true, nullable: true })
    slug?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    icon_url?: string;

    @Column({ default: 0 })
    display_order: number;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => ServiceCategory, (category) => category.subcategories, { onDelete: 'CASCADE' })
    category: ServiceCategory;

    @OneToMany(() => Service, (service) => service.subcategory)
    services: Service[];
}
