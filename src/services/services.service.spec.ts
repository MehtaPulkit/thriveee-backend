import { Test, TestingModule } from '@nestjs/testing';
import { Services } from './services.service';

describe('Services', () => {
  let service: Services;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Services],
    }).compile();

    service = module.get<Services>(Services);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
