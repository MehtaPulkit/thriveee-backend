import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceSubcategoriesService } from './service-subcategories.service';
import { ServiceSubcategory } from './service-subcategories.entity';
import { ServiceCategory } from '../service-categories/service-categories.entity';

describe('ServiceSubcategoriesService', () => {
  let service: ServiceSubcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceSubcategoriesService,
        { provide: getRepositoryToken(ServiceSubcategory), useValue: {} },
        { provide: getRepositoryToken(ServiceCategory), useValue: {} },
      ],
    }).compile();

    service = module.get<ServiceSubcategoriesService>(
      ServiceSubcategoriesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
