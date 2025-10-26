import { Controller, Get, Param } from '@nestjs/common';
import { ServiceExplorerService } from './service-explorer.service';
import { SuburbQueryDto } from './dto/suburb-query.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Service Explorer')
@Controller('service-explorer')
export class ServiceExplorerController {
    constructor(private readonly serviceExplorerService: ServiceExplorerService) { }

    @Get(':suburbId')
    @ApiParam({ name: 'suburbId', type: 'string', description: 'Suburb ID (UUID)' })
    async getServicesBySuburb(@Param() params: SuburbQueryDto) {
        return this.serviceExplorerService.getServicesBySuburb(params.suburbId);
    }
}
