import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuburbsModule } from './suburbs/suburbs.module';
import { ServiceCategoriesModule } from './service-categories/service-categories.module';
import { ServiceSubcategoriesModule } from './service-subcategories/service-subcategories.module';
import { ServicesModule } from './services/services.module';
import { ProvidersModule } from './providers/providers.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProviderSuburbsModule } from './provider-suburbs/provider-suburbs.module';
import { ProviderServicesModule } from './provider-services/provider-services.module';
import { ServiceExplorerModule } from './service-explorer/service-explorer.module';
import { SupabaseSyncModule } from './supabase-sync/supabase-sync.module';
import { CustomersModule } from './customers/customers.module';
import { CustomerAddressesModule } from './customer-addresses/customer-addresses.module';
import { ServiceComponentsModule } from './service-components/service-components.module';
import { ServiceComponentRatesModule } from './service-component-rates/service-component-rates.module';
import { ServiceMultipliersModule } from './service-multipliers/service-multipliers.module';
import { PricingModule } from './pricing/pricing.module';
import { BookingsModule } from './bookings/bookings.module';
import { BookingItemsModule } from './booking-items/booking-items.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false, // ✅ only for dev! Turn off in production
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
    ProviderSuburbsModule,
    ProviderServicesModule,
    ServiceExplorerModule,
    SupabaseSyncModule,
    CustomersModule,
    CustomerAddressesModule,
    ServiceComponentsModule,
    ServiceComponentRatesModule,
    ServiceMultipliersModule,
    PricingModule,
    BookingsModule,
    BookingItemsModule,
    OrdersModule,
  ],
})
export class AppModule {}
