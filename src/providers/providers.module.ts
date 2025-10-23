import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { Profile } from 'src/profiles/profile.entity';
import { ProviderSuburb } from 'src/provider-suburbs/provider-suburb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, Profile, ProviderSuburb])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule { }
