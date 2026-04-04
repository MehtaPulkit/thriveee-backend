import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
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
  async handleSupabaseEvent(
    @Body() body: SupabaseUserDto,
    @Headers('x-supabase-signature') signature: string,
  ) {
    // Optionally verify webhook signature later (security enhancement)
    await this.supabaseSyncService.handleSupabaseEvent(body);
    return { received: true };
  }
}
