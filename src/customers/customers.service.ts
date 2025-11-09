import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) { }

    findAll() {
        return this.customerRepository.find({ relations: ['profile'] });
    }

    findOne(id: string) {
        return this.customerRepository.findOne({ where: { id }, relations: ['profile'] });
    }

    update(id: string, updateData: Partial<Customer>) {
        return this.customerRepository.update(id, updateData);
    }

    async remove(id: string) {
        return this.customerRepository.delete(id);
    }
}
