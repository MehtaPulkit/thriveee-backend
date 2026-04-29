import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceCategoriesService } from './service-categories.service';
import { ServiceCategory } from './service-categories.entity';

describe('ServiceCategoriesService', () => {
  let service: ServiceCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceCategoriesService,
        { provide: getRepositoryToken(ServiceCategory), useValue: {} },
      ],
    }).compile();

    service = module.get<ServiceCategoriesService>(ServiceCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
