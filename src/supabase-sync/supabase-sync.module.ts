import { Module } from '@nestjs/common';
import { SupabaseSyncController } from './supabase-sync.controller';
import { SupabaseSyncService } from './supabase-sync.service';

@Module({
  controllers: [SupabaseSyncController],
  providers: [SupabaseSyncService],
})
export class SupabaseSyncModule {}
