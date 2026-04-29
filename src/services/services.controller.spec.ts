import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

describe('ServicesController', () => {
  let controller: ServicesController;
  let service: jest.Mocked<ServicesService>;

  const serviceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [{ provide: ServicesService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
    service = module.get(ServicesService);
    jest.clearAllMocks();
  });

  it('returns all services', async () => {
    const expected = [{ id: 'service-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns one service', async () => {
    const expected = { id: 'service-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('service-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('service-1');
  });

  it('creates a service', async () => {
    const dto = { name: 'Cleaning' } as any;
    const expected = { id: 'service-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('updates a service', async () => {
    const dto = { name: 'Deep Cleaning' } as any;
    const expected = { id: 'service-1', name: 'Deep Cleaning' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('service-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.update).toHaveBeenCalledWith('service-1', dto);
  });

  it('removes a service', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('service-1')).resolves.toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('service-1');
  });
});
