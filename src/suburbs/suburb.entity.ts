import { ProviderSuburb } from '../provider-suburbs/provider-suburb.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('suburbs')
@Index(['name', 'lga_name'], { unique: true })
export class Suburb {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  lga_name: string;

  @Column({ type: 'float', nullable: true })
  area_ha: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  center: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
  })
  boundary: string;
  @OneToMany(() => ProviderSuburb, (providerSuburb) => providerSuburb.suburb)
  providerSuburbs: ProviderSuburb[];
}
