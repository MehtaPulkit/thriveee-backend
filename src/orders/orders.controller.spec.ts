import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: jest.Mocked<OrdersService>;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: serviceMock }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get(OrdersService);
    jest.clearAllMocks();
  });

  it('creates an order', async () => {
    const dto = { bookingId: 'booking-1' } as any;
    const expected = { id: 'order-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('returns all orders', async () => {
    const expected = [{ id: 'order-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns one order', async () => {
    const expected = { id: 'order-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('order-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('order-1');
  });

  it('updates an order', async () => {
    const dto = { status: 'completed' } as any;
    const expected = { id: 'order-1', status: 'completed' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('order-1', dto)).resolves.toEqual(expected);
    expect(service.update).toHaveBeenCalledWith('order-1', dto);
  });

  it('removes an order', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('order-1')).resolves.toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('order-1');
  });
});
