import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProviderSuburbsService } from './provider-suburbs.service';
import { ProviderSuburb } from './provider-suburb.entity';

describe('ProviderSuburbsService', () => {
  let service: ProviderSuburbsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderSuburbsService,
        { provide: getRepositoryToken(ProviderSuburb), useValue: {} },
      ],
    }).compile();

    service = module.get<ProviderSuburbsService>(ProviderSuburbsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
