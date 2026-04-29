import { Test, TestingModule } from '@nestjs/testing';
import { BookingItemsController } from './booking-items.controller';
import { BookingItemsService } from './booking-items.service';

describe('BookingItemsController', () => {
  let controller: BookingItemsController;
  let service: jest.Mocked<BookingItemsService>;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingItemsController],
      providers: [{ provide: BookingItemsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<BookingItemsController>(BookingItemsController);
    service = module.get(BookingItemsService);
    jest.clearAllMocks();
  });

  it('creates a booking item', async () => {
    const dto = { bookingId: 'booking-1', serviceId: 'service-1' } as any;
    const expected = { id: 'item-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('returns all booking items', async () => {
    const expected = [{ id: 'item-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns one booking item', async () => {
    const expected = { id: 'item-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('item-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('item-1');
  });

  it('updates a booking item', async () => {
    const dto = { quantity: 2 } as any;
    const expected = { id: 'item-1', quantity: 2 };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('item-1', dto)).resolves.toEqual(expected);
    expect(service.update).toHaveBeenCalledWith('item-1', dto);
  });

  it('removes a booking item', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('item-1')).resolves.toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('item-1');
  });
});
