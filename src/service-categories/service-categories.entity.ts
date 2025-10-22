import { ServiceSubcategory } from 'src/service-subcategories/service-subcategories.entity';
import { Service } from 'src/services/services.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('service_categories')
export class ServiceCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
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

    @ManyToOne(() => ServiceCategory, (category) => category.children, { nullable: true })
    parent?: ServiceCategory;

    @OneToMany(() => ServiceCategory, (category) => category.parent)
    children: ServiceCategory[];

    @OneToMany(() => ServiceSubcategory, (sub) => sub.category)
    subcategories: ServiceSubcategory[];

    @OneToMany(() => Service, (service) => service.category)
    services: Service[];
}
