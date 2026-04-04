import { Controller, Get, Param, Query } from '@nestjs/common';
import { SuburbsService } from './suburbs.service';

@Controller('suburbs')
export class SuburbsController {
  constructor(private readonly suburbsService: SuburbsService) {}

  @Get()
  async getAll() {
    return this.suburbsService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string) {
    if (!query) return [];
    return this.suburbsService.searchByName(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.suburbsService.findOne(id);
  }
}
