import { Test, TestingModule } from '@nestjs/testing';
import { SuburbsService } from './suburbs.service';

describe('SuburbsService', () => {
  let service: SuburbsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuburbsService],
    }).compile();

    service = module.get<SuburbsService>(SuburbsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
