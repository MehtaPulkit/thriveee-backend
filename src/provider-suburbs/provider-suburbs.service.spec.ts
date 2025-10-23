import { Test, TestingModule } from '@nestjs/testing';
import { ProviderSuburbsService } from './provider-suburbs.service';

describe('ProviderSuburbsService', () => {
  let service: ProviderSuburbsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderSuburbsService],
    }).compile();

    service = module.get<ProviderSuburbsService>(ProviderSuburbsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
