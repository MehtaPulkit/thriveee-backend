import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { Service } from './services.entity';
import { ServiceCategory } from '../service-categories/service-categories.entity';
import { ServiceSubcategory } from '../service-subcategories/service-subcategories.entity';

describe('ServicesService', () => {
  let service: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        { provide: getRepositoryToken(Service), useValue: {} },
        { provide: getRepositoryToken(ServiceCategory), useValue: {} },
        { provide: getRepositoryToken(ServiceSubcategory), useValue: {} },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
