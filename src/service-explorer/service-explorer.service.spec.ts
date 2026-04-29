import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceExplorerService } from './service-explorer.service';
import { ProviderSuburb } from '../provider-suburbs/provider-suburb.entity';
import { ProviderService } from '../provider-services/provider-service.entity';
import { Service } from '../services/services.entity';
import { Suburb } from '../suburbs/suburb.entity';

describe('ServiceExplorerService', () => {
  let service: ServiceExplorerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceExplorerService,
        { provide: getRepositoryToken(ProviderSuburb), useValue: {} },
        { provide: getRepositoryToken(ProviderService), useValue: {} },
        { provide: getRepositoryToken(Service), useValue: {} },
        { provide: getRepositoryToken(Suburb), useValue: {} },
      ],
    }).compile();

    service = module.get<ServiceExplorerService>(ServiceExplorerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
