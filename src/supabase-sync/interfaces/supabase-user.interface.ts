export interface SupabaseAuthUser {
    id: string;
    email: string;
    user_metadata: {
        first_name?: string;
        last_name?: string;
        phone?: string;
        role?: 'customer' | 'provider';
    };
}
