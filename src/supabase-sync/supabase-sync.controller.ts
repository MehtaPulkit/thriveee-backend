import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SupabaseSyncService } from './supabase-sync.service';
import { SupabaseUserDto } from './dto/supabase-user.dto';

@Controller('supabase-hooks')
export class SupabaseSyncController {
  constructor(private readonly supabaseSyncService: SupabaseSyncService) {}

  /**
   * Webhook endpoint for Supabase Auth events.
   * Configure this URL in Supabase dashboard.
   */
  @Post()
  @HttpCode(200)
  async handleSupabaseEvent(@Body() body: SupabaseUserDto) {
    await this.supabaseSyncService.handleSupabaseEvent(body);
    return { received: true };
  }
}
