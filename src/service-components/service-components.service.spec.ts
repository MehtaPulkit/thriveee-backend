import { Test, TestingModule } from '@nestjs/testing';
import { ServiceComponentsService } from './service-components.service';

describe('ServiceComponentsService', () => {
  let service: ServiceComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceComponentsService],
    }).compile();

    service = module.get<ServiceComponentsService>(ServiceComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
