import { Controller, Get, Param } from '@nestjs/common';
import { ServiceExplorerService } from './service-explorer.service';
import { SuburbIdQueryDto, SuburbNameQueryDto } from './dto/suburb-query.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Service Explorer')
@Controller('service-explorer')
export class ServiceExplorerController {
  constructor(
    private readonly serviceExplorerService: ServiceExplorerService,
  ) {}

  @Get('suburb/:suburbId')
  @ApiParam({
    name: 'suburbId',
    type: 'string',
    description: 'Suburb ID (UUID)',
  })
  async getServicesBySuburb(@Param() params: SuburbIdQueryDto) {
    return this.serviceExplorerService.getServicesBySuburb(params.suburbId);
  }

  @Get('suburb-name/:suburbName')
  @ApiParam({ name: 'suburbName', type: 'string', description: 'Suburb Name' })
  async getServicesBySuburbName(@Param() params: SuburbNameQueryDto) {
    return this.serviceExplorerService.getServicesBySuburbName(
      params.suburbName,
    );
  }
}
