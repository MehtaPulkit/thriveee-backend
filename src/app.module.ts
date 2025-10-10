import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuburbsModule } from './suburbs/suburbs.module';

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
  ],
})
export class AppModule { }
