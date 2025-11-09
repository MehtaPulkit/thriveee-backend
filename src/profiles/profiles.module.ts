import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Customer } from 'src/customers/customer.entity';
import { Provider } from 'src/providers/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Customer, Provider])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule { }
