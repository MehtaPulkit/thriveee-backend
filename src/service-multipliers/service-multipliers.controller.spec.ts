import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMultipliersController } from './service-multipliers.controller';
import { ServiceMultipliersService } from './service-multipliers.service';

describe('ServiceMultipliersController', () => {
  let controller: ServiceMultipliersController;
  let service: jest.Mocked<ServiceMultipliersService>;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceMultipliersController],
      providers: [
        { provide: ServiceMultipliersService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<ServiceMultipliersController>(
      ServiceMultipliersController,
    );
    service = module.get(ServiceMultipliersService);
    jest.clearAllMocks();
  });

  it('creates a service multiplier', async () => {
    const dto = { serviceId: 'service-1', type: 'weekend' } as any;
    const expected = { id: 'multiplier-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('returns all multipliers when no service filter is provided', async () => {
    const expected = [{ id: 'multiplier-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledWith(undefined);
  });

  it('returns filtered multipliers when service_id is provided', async () => {
    const expected = [{ id: 'multiplier-1', serviceId: 'service-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll('service-1')).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledWith('service-1');
  });

  it('returns one multiplier', async () => {
    const expected = { id: 'multiplier-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('multiplier-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('multiplier-1');
  });

  it('updates a multiplier', async () => {
    const dto = { value: 1.2 } as any;
    const expected = { id: 'multiplier-1', value: 1.2 };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('multiplier-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.update).toHaveBeenCalledWith('multiplier-1', dto);
  });

  it('removes a multiplier', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('multiplier-1')).resolves.toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('multiplier-1');
  });
});
