import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceComponentRate } from "src/service-component-rates/service-component-rate.entity";
import { ServiceComponent } from "src/service-components/service-component.entity";
import { ServiceMultiplier } from "src/service-multipliers/service-multiplier.entity";
import { Service } from "src/services/services.entity";
import { PricingController } from "./pricing.controller";
import { PricingService } from "./pricing.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Service,
            ServiceComponent,
            ServiceComponentRate,
            ServiceMultiplier,
        ]),
    ],
    controllers: [PricingController],
    providers: [PricingService],
    exports: [PricingService], // important!
})
export class PricingModule { }
