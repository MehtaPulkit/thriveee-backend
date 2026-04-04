export class SupabaseUserDto {
  type: string; // "USER_CREATED", "USER_UPDATED"
  record: {
    id: string;
    email: string;
    created_at?: string;
    user_metadata?: {
      first_name?: string;
      last_name?: string;
      phone?: string;
      role?: 'customer' | 'provider';
    };
  };
}
