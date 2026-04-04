import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseUserDto } from './dto/supabase-user.dto';

@Injectable()
export class SupabaseSyncService {
  private readonly logger = new Logger(SupabaseSyncService.name);
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!, // Service key (secure)
    );
  }

  async handleSupabaseEvent(payload: SupabaseUserDto) {
    const eventType = payload.type;
    const user = payload.record;

    this.logger.log(`Received Supabase event: ${eventType}`);

    if (eventType === 'USER_CREATED' && user) {
      await this.handleUserCreated(user);
    } else if (eventType === 'USER_UPDATED' && user) {
      await this.handleUserUpdated(user);
    } else {
      this.logger.warn(`Unhandled event type: ${eventType}`);
    }
  }

  private async handleUserCreated(user: any) {
    const { id, email, user_metadata } = user;
    const { first_name, last_name, phone, role } = user_metadata || {};

    // 1️⃣ Create profile
    const { error: profileError } = await this.supabase
      .from('profiles')
      .insert([
        {
          id,
          email,
          first_name,
          last_name,
          phone_number: phone,
          role: role || 'customer',
        },
      ]);

    if (profileError) {
      this.logger.error('Error inserting profile:', profileError.message);
      throw profileError;
    }

    // 2️⃣ Create role-specific record
    if (role === 'provider') {
      const { error } = await this.supabase
        .from('providers')
        .insert([{ profile_id: id }]);
      if (error)
        this.logger.error('Error creating provider record:', error.message);
    } else {
      const { error } = await this.supabase
        .from('customers')
        .insert([{ profile_id: id }]);
      if (error)
        this.logger.error('Error creating customer record:', error.message);
    }

    this.logger.log(`User synced: ${email} (${role})`);
  }

  private async handleUserUpdated(user: any) {
    const { id, email, user_metadata } = user;
    const { first_name, last_name, phone, role } = user_metadata || {};

    const { error } = await this.supabase
      .from('profiles')
      .update({
        email,
        first_name,
        last_name,
        phone_number: phone,
        role,
      })
      .eq('id', id);

    if (error) {
      this.logger.error('Error updating profile:', error.message);
      throw error;
    }

    this.logger.log(`User profile updated: ${email}`);
  }
}
