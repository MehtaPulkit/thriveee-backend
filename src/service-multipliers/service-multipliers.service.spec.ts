import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceMultipliersService } from './service-multipliers.service';
import { ServiceMultiplier } from './service-multiplier.entity';
import { Service } from '../services/services.entity';

describe('ServiceMultipliersService', () => {
  let service: ServiceMultipliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceMultipliersService,
        { provide: getRepositoryToken(ServiceMultiplier), useValue: {} },
        { provide: getRepositoryToken(Service), useValue: {} },
      ],
    }).compile();

    service = module.get<ServiceMultipliersService>(ServiceMultipliersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
