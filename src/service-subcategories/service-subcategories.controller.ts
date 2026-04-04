import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ServiceSubcategoriesService } from './service-subcategories.service';
import { CreateServiceSubcategoryDto } from './dto/create-service-subcategories.dto';
import { UpdateServiceSubcategoryDto } from './dto/update-service-subcategories.dto';

@Controller('service-subcategories')
export class ServiceSubcategoriesController {
  constructor(
    private readonly subcategoriesService: ServiceSubcategoriesService,
  ) {}

  // GET /service-subcategories?categoryId=uuid
  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    return this.subcategoriesService.findAll(categoryId);
  }

  // GET /service-subcategories/:id
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.subcategoriesService.findOne(id);
  }

  // POST /service-subcategories
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateServiceSubcategoryDto) {
    return this.subcategoriesService.create(dto);
  }

  // PATCH /service-subcategories/:id
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateServiceSubcategoryDto,
  ) {
    return this.subcategoriesService.update(id, dto);
  }

  // DELETE /service-subcategories/:id
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.subcategoriesService.remove(id);
  }
}
