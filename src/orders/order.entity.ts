import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { OrderStatus } from './order-status.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Production-level Order Number
   * 1. 'generated: "increment"' creates a SERIAL/IDENTITY column in Postgres.
   * 2. Indexing makes it lightning fast for customer support to search.
   * 3. 'select: true' ensures it's always available.
   */
  @Column({
    type: 'integer',
    generated: 'increment',
    unique: true,
  })
  @Index('idx_orders_order_number')
  order_number: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'uuid' })
  customer_id: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.DRAFT,
  })
  status: OrderStatus;

  // numeric is returned as string by pg driver, using transformer to convert to number
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  total_amount: number;

  @Column({ default: 'AUD' })
  currency: string;

  @Column({ nullable: true })
  stripe_payment_intent_id: string;

  @Column({ type: 'timestamptz', nullable: true })
  paid_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  /**
   * Virtual property for customer-facing display
   * Formats: 101 -> "ORD-000101"
   */
  get display_id(): string {
    if (!this.order_number) return '';
    return `ORD-${this.order_number.toString().padStart(6, '0')}`;
  }

  // This ensures 'display_id' is included when converting to JSON (API responses)
  toJSON() {
    return {
      ...this,
      display_id: this.display_id,
    };
  }
}
