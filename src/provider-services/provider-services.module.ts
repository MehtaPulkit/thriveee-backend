import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderServicesService } from './provider-services.service';
import { ProviderServicesController } from './provider-services.controller';
import { ProviderService } from './provider-service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProviderService])],
    controllers: [ProviderServicesController],
    providers: [ProviderServicesService],
    exports: [ProviderServicesService],
})
export class ProviderServicesModule { }
