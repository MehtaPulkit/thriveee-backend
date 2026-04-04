import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from '../profiles/profile.entity';
import { ProviderSuburb } from '../provider-suburbs/provider-suburb.entity';
import { ProviderService } from '../provider-services/provider-service.entity';

@Entity('providers')
export class Provider {
  @PrimaryColumn('uuid')
  id: string; // same as Profile.id

  @Column({ nullable: true })
  business_name?: string;

  @Column({ nullable: true })
  abn?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ type: 'numeric', default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  total_reviews: number;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ type: 'numeric', default: 5 })
  service_radius_km: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => ProviderSuburb, (ps) => ps.provider, { cascade: true })
  providerSuburbs: ProviderSuburb[];

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'id' })
  profile: Profile;

  @OneToMany(
    () => ProviderService,
    (providerService) => providerService.provider,
  )
  providerServices: ProviderService[];
}
