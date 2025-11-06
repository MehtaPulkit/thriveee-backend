import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseSyncService } from './supabase-sync.service';

describe('SupabaseSyncService', () => {
  let service: SupabaseSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupabaseSyncService],
    }).compile();

    service = module.get<SupabaseSyncService>(SupabaseSyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
