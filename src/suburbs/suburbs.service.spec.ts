import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SuburbsService } from './suburbs.service';
import { Suburb } from './suburb.entity';

describe('SuburbsService', () => {
  let service: SuburbsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuburbsService,
        { provide: getRepositoryToken(Suburb), useValue: {} },
      ],
    }).compile();

    service = module.get<SuburbsService>(SuburbsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
