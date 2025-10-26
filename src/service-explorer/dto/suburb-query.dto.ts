import { IsUUID } from 'class-validator';

export class SuburbQueryDto {
    @IsUUID()
    suburbId: string;
}
