import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceComponentsService } from './service-components.service';
import { ServiceComponentsController } from './service-components.controller';
import { ServiceComponent } from './service-component.entity';
import { Service } from '../services/services.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ServiceComponent, Service]),
    ],
    controllers: [ServiceComponentsController],
    providers: [ServiceComponentsService],
    exports: [ServiceComponentsService],
})
export class ServiceComponentsModule { }
