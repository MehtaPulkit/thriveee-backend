import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProviderServicesService } from './provider-services.service';
import { ProviderService } from './provider-service.entity';

describe('ProviderServicesService', () => {
  let service: ProviderServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderServicesService,
        { provide: getRepositoryToken(ProviderService), useValue: {} },
      ],
    }).compile();

    service = module.get<ProviderServicesService>(ProviderServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
