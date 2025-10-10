import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuburbsService } from './suburbs.service';
import { SuburbsController } from './suburbs.controller';
import { Suburb } from './suburb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suburb])],
  controllers: [SuburbsController],
  providers: [SuburbsService],
})
export class SuburbsModule { }
