import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAddressesController } from './customer-addresses.controller';
import { CustomerAddressesService } from './customer-addresses.service';

describe('CustomerAddressesController', () => {
  let controller: CustomerAddressesController;
  let service: jest.Mocked<CustomerAddressesService>;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAddressesController],
      providers: [{ provide: CustomerAddressesService, useValue: serviceMock }],
    }).compile();

    controller = module.get<CustomerAddressesController>(
      CustomerAddressesController,
    );
    service = module.get(CustomerAddressesService);
    jest.clearAllMocks();
  });

  it('creates a customer address', async () => {
    const dto = { customerId: 'customer-1', addressLine1: '1 Main St' } as any;
    const expected = { id: 'address-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('returns all addresses when no customer filter is provided', async () => {
    const expected = [{ id: 'address-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledWith(undefined);
  });

  it('returns filtered addresses when customerId is provided', async () => {
    const expected = [{ id: 'address-1', customerId: 'customer-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll('customer-1')).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledWith('customer-1');
  });

  it('returns one customer address', async () => {
    const expected = { id: 'address-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('address-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('address-1');
  });

  it('updates a customer address', async () => {
    const dto = { addressLine1: '2 Main St' } as any;
    const expected = { id: 'address-1', addressLine1: '2 Main St' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('address-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.update).toHaveBeenCalledWith('address-1', dto);
  });

  it('removes a customer address', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('address-1')).resolves.toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('address-1');
  });
});
