import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAddress } from './customer-address.entity';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';

@Injectable()
export class CustomerAddressesService {
  constructor(
    @InjectRepository(CustomerAddress)
    private readonly repo: Repository<CustomerAddress>,
  ) {}

  async create(dto: CreateCustomerAddressDto): Promise<CustomerAddress> {
    const address = this.repo.create(dto);
    if (dto.is_default) {
      // Unset previous primary address for same customer
      await this.repo.update(
        { customer_id: dto.customer_id },
        { is_default: false },
      );
    }
    return this.repo.save(address);
  }

  findAll(customerId?: string): Promise<CustomerAddress[]> {
    if (customerId) {
      return this.repo.find({
        where: { customer_id: customerId },
        order: { created_at: 'DESC' },
      });
    }
    return this.repo.find({
      relations: ['customer'],
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: string): Promise<CustomerAddress | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(
    id: string,
    dto: UpdateCustomerAddressDto,
  ): Promise<CustomerAddress | null> {
    if (dto.is_default) {
      const existing = await this.repo.findOne({ where: { id } });
      if (existing) {
        await this.repo.update(
          { customer_id: existing.customer_id },
          { is_default: false },
        );
      }
    }
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
