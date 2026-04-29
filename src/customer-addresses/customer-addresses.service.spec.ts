import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerAddressesService } from './customer-addresses.service';
import { CustomerAddress } from './customer-address.entity';

describe('CustomerAddressesService', () => {
  let service: CustomerAddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerAddressesService,
        { provide: getRepositoryToken(CustomerAddress), useValue: {} },
      ],
    }).compile();

    service = module.get<CustomerAddressesService>(CustomerAddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
