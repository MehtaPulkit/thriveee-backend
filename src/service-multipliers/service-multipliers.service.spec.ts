import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMultipliersService } from './service-multipliers.service';

describe('ServiceMultipliersService', () => {
  let service: ServiceMultipliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceMultipliersService],
    }).compile();

    service = module.get<ServiceMultipliersService>(ServiceMultipliersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
