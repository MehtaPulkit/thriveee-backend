import { ServiceComponent } from '../service-components/service-component.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  ValueTransformer,
} from 'typeorm';

// 1. Define the transformer
export class ColumnNumericTransformer implements ValueTransformer {
  // When saving to DB (Number -> String)
  to(data: number | null): number | null {
    return data;
  }
  // When fetching from DB (String -> Number)
  from(data: string | null): number | null {
    return data !== null ? parseFloat(data) : null;
  }
}

@Entity('service_component_rates')
export class ServiceComponentRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ServiceComponent, (component) => component.rates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'component_id' })
  component: ServiceComponent;

  // 2. Apply the transformer to your numeric columns
  @Column({
    type: 'numeric',
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  per_unit_price: number;

  @Column({
    type: 'numeric',
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  flat_price: number;

  @CreateDateColumn()
  created_at: Date;
}
