import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceComponentRatesService } from './service-component-rates.service';
import { ServiceComponentRate } from './service-component-rate.entity';
import { ServiceComponent } from '../service-components/service-component.entity';

describe('ServiceComponentRatesService', () => {
  let service: ServiceComponentRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceComponentRatesService,
        { provide: getRepositoryToken(ServiceComponentRate), useValue: {} },
        { provide: getRepositoryToken(ServiceComponent), useValue: {} },
      ],
    }).compile();

    service = module.get<ServiceComponentRatesService>(
      ServiceComponentRatesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
