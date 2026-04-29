import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseSyncController } from './supabase-sync.controller';
import { SupabaseSyncService } from './supabase-sync.service';

describe('SupabaseSyncController', () => {
  let controller: SupabaseSyncController;
  let service: jest.Mocked<SupabaseSyncService>;

  const serviceMock = {
    handleSupabaseEvent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupabaseSyncController],
      providers: [{ provide: SupabaseSyncService, useValue: serviceMock }],
    }).compile();

    controller = module.get<SupabaseSyncController>(SupabaseSyncController);
    service = module.get(SupabaseSyncService);
    jest.clearAllMocks();
  });

  it('passes supabase webhook events to the sync service', async () => {
    const body = { user_id: 'user-1', email: 'user@example.com' } as any;
    service.handleSupabaseEvent.mockResolvedValue(undefined as never);

    await expect(
      controller.handleSupabaseEvent(body, 'signature-value'),
    ).resolves.toEqual({ received: true });
    expect(service.handleSupabaseEvent).toHaveBeenCalledWith(body);
  });
});
