import { Test, TestingModule } from '@nestjs/testing';
import { ServiceComponentRatesService } from './service-component-rates.service';

describe('ServiceComponentRatesService', () => {
  let service: ServiceComponentRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceComponentRatesService],
    }).compile();

    service = module.get<ServiceComponentRatesService>(
      ServiceComponentRatesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
