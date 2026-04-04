import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSubcategoriesService } from './service-subcategories.service';

describe('ServiceSubcategoriesService', () => {
  let service: ServiceSubcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceSubcategoriesService],
    }).compile();

    service = module.get<ServiceSubcategoriesService>(
      ServiceSubcategoriesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
