import { IsString, IsEmail, IsOptional, IsBoolean, IsNotEmpty, IsIn } from 'class-validator';

export class CreateCustomerDto {

    // Profile info
    @IsString() @IsNotEmpty() first_name: string;
    @IsString() @IsNotEmpty() last_name: string;
    @IsEmail() email: string;
    @IsString() @IsNotEmpty() phone_number: string;
    @IsString() @IsOptional() address?: string;

    // Customer-specific
    @IsString() @IsNotEmpty() date_of_birth: Date;
    @IsOptional()
    @IsIn(['male', 'female', 'other'], {
        message: "Gender must be 'male', 'female', or 'other'",
    })
    gender?: 'male' | 'female' | 'other';
    @IsBoolean() @IsOptional() email_notifications_enabled?: boolean;
    @IsBoolean() @IsOptional() sms_notifications_enabled?: boolean;
    @IsBoolean() @IsOptional() marketing_communications_enabled?: boolean;

}
