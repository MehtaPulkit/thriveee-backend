import { IsEmail, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsIn(['customer', 'provider', 'admin', 'superadmin', 'staff'])
  role?: 'customer' | 'provider' | 'admin' | 'superadmin' | 'staff';

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;
}
