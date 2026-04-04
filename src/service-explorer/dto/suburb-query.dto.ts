import { IsString, IsUUID } from 'class-validator';

export class SuburbIdQueryDto {
  @IsUUID()
  suburbId: string;
}

export class SuburbNameQueryDto {
  @IsString()
  suburbName: string;
}
