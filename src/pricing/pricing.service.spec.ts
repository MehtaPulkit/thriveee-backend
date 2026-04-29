import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PricingService } from './pricing.service';
import { Service } from '../services/services.entity';
import { ServiceComponent } from '../service-components/service-component.entity';
import { ServiceMultiplier } from '../service-multipliers/service-multiplier.entity';

describe('PricingService', () => {
  let service: PricingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricingService,
        { provide: getRepositoryToken(Service), useValue: {} },
        { provide: getRepositoryToken(ServiceComponent), useValue: {} },
        { provide: getRepositoryToken(ServiceMultiplier), useValue: {} },
      ],
    }).compile();

    service = module.get<PricingService>(PricingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
