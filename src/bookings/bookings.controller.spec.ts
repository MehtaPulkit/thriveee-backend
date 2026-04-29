import { Test, TestingModule } from '@nestjs/testing';
import { BookingOrchestratorService } from './booking-orchestrator.service';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

describe('BookingsController', () => {
  let controller: BookingsController;
  let bookingsService: jest.Mocked<BookingsService>;
  let orchestratorService: jest.Mocked<BookingOrchestratorService>;

  const bookingsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const orchestratorServiceMock = {
    checkout: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        { provide: BookingsService, useValue: bookingsServiceMock },
        {
          provide: BookingOrchestratorService,
          useValue: orchestratorServiceMock,
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    bookingsService = module.get(BookingsService);
    orchestratorService = module.get(BookingOrchestratorService);
    jest.clearAllMocks();
  });

  it('creates a booking', async () => {
    const dto = { customerId: 'customer-1' } as any;
    const expected = { id: 'booking-1' };
    bookingsService.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(bookingsService.create).toHaveBeenCalledWith(dto);
  });

  it('returns all bookings', async () => {
    const expected = [{ id: 'booking-1' }];
    bookingsService.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(bookingsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns one booking', async () => {
    const expected = { id: 'booking-1' };
    bookingsService.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('booking-1')).resolves.toEqual(expected);
    expect(bookingsService.findOne).toHaveBeenCalledWith('booking-1');
  });

  it('updates a booking', async () => {
    const dto = { notes: 'Updated' } as any;
    const expected = { id: 'booking-1', notes: 'Updated' };
    bookingsService.update.mockResolvedValue(expected as never);

    await expect(controller.update('booking-1', dto)).resolves.toEqual(
      expected,
    );
    expect(bookingsService.update).toHaveBeenCalledWith('booking-1', dto);
  });

  it('removes a booking', async () => {
    const expected = { message: 'Booking deleted' };
    bookingsService.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('booking-1')).resolves.toEqual(expected);
    expect(bookingsService.remove).toHaveBeenCalledWith('booking-1');
  });

  it('checks out a booking', async () => {
    const dto = { bookingId: 'booking-1' } as any;
    const expected = { orderId: 'order-1' };
    orchestratorService.checkout.mockResolvedValue(expected as never);

    await expect(controller.checkout(dto)).resolves.toEqual(expected);
    expect(orchestratorService.checkout).toHaveBeenCalledWith(dto);
  });
});
