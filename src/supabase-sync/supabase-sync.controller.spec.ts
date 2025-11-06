import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseSyncController } from './supabase-sync.controller';

describe('SupabaseSyncController', () => {
  let controller: SupabaseSyncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupabaseSyncController],
    }).compile();

    controller = module.get<SupabaseSyncController>(SupabaseSyncController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
