import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceComponentRate } from 'src/service-component-rates/service-component-rate.entity';
import { Service } from 'src/services/services.entity';

@Entity('service_components')
export class ServiceComponent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;
    
    @Column()
    label: string;
    
    @Column({ nullable: true })
    description: string;

    @Column({ default: true })
    is_active: boolean;

    @Column()
    service_id: string;

    @ManyToOne(() => Service, (service) => service.components, {
        onDelete: 'CASCADE',
    }) 
    
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @OneToMany(() => ServiceComponentRate, (rate) => rate.component, {
        cascade: true,
    })
    rates: ServiceComponentRate[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}
