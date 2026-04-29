import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: jest.Mocked<CustomersService>;

  const serviceMock = {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{ provide: CustomersService, useValue: serviceMock }],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get(CustomersService);
    jest.clearAllMocks();
  });

  it('returns all customers', async () => {
    const expected = [{ id: 'customer-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('creates a customer', async () => {
    const dto = { email: 'customer@example.com' } as any;
    const expected = { id: 'customer-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('returns one customer', async () => {
    const expected = { id: 'customer-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('customer-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('customer-1');
  });

  it('updates a customer', async () => {
    const dto = { firstName: 'Updated' };
    const expected = { id: 'customer-1', firstName: 'Updated' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('customer-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.update).toHaveBeenCalledWith('customer-1', dto);
  });

  it('removes a customer', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('customer-1')).resolves.toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('customer-1');
  });
});
