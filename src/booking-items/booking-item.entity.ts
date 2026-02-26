import { Booking } from '../bookings/bookings.entity';
import { ServiceComponent } from '../service-components/service-component.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('booking_items')
export class BookingItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    booking_id: string;

    @Column({ type: 'uuid' })
    component_id: string;

    @Column({ type: 'numeric', default: 1 })
    quantity: number;

    @Column({ type: 'numeric' })
    price: number;

    @Column({ type: 'numeric' })
    total: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    // Relations
    @ManyToOne(() => Booking, (booking) => booking.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'booking_id' })
    booking: Booking;

    @ManyToOne(() => ServiceComponent)
    @JoinColumn({ name: 'component_id' })
    component: ServiceComponent;
}
