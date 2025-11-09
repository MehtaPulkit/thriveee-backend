import { Controller, Get, Param, Patch, Body, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Get()
    findAll(): Promise<Customer[]> {
        return this.customersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Customer | null> {
        return this.customersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Partial<Customer>) {
        return this.customersService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customersService.remove(id);
    }
}
