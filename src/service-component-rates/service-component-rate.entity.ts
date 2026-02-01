import { ServiceComponent } from 'src/service-components/service-component.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn
} from 'typeorm';

@Entity('service_component_rates')
export class ServiceComponentRate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ServiceComponent, (component) => component.rates, {
    onDelete: 'CASCADE'})
    @JoinColumn({ name: 'component_id' })
    component: ServiceComponent;

    @Column('numeric', { nullable: true })
    per_unit_price: number;

    @Column('numeric', { nullable: true })
    flat_price: number;

    @CreateDateColumn()
    created_at: Date;
}
