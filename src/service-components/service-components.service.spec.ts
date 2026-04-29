import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceComponentsService } from './service-components.service';
import { ServiceComponent } from './service-component.entity';
import { Service } from '../services/services.entity';

describe('ServiceComponentsService', () => {
  let service: ServiceComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceComponentsService,
        { provide: getRepositoryToken(ServiceComponent), useValue: {} },
        { provide: getRepositoryToken(Service), useValue: {} },
      ],
    }).compile();

    service = module.get<ServiceComponentsService>(ServiceComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
