import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuburbsModule } from './suburbs/suburbs.module';
import { ServiceCategoriesModule } from './service-categories/service-categories.module';
import { ServiceSubcategoriesController } from './service-subcategories/service-subcategories.controller';
import { ServiceSubcategoriesService } from './service-subcategories/service-subcategories.service';
import { ServiceSubcategoriesModule } from './service-subcategories/service-subcategories.module';
import { ServicesModule } from './services/services.module';
import { ProvidersModule } from './providers/providers.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // ✅ only for dev! Turn off in production
      ssl: {
        rejectUnauthorized: false, // ⚠️ required for Supabase
      },
    }),
    SuburbsModule,
    ServiceCategoriesModule,
    ServiceSubcategoriesModule,
    ServicesModule,
    ProvidersModule,
    ProfilesModule,
  ],
})
export class AppModule { }
