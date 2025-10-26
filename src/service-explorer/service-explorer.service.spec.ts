import { Test, TestingModule } from '@nestjs/testing';
import { ServiceExplorerService } from './service-explorer.service';

describe('ServiceExplorerService', () => {
  let service: ServiceExplorerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceExplorerService],
    }).compile();

    service = module.get<ServiceExplorerService>(ServiceExplorerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
