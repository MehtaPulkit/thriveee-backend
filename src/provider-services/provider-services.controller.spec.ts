import { Test, TestingModule } from '@nestjs/testing';
import { ProviderServicesController } from './provider-services.controller';
import { ProviderServicesService } from './provider-services.service';

describe('ProviderServicesController', () => {
  let controller: ProviderServicesController;
  let service: jest.Mocked<ProviderServicesService>;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByProvider: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderServicesController],
      providers: [{ provide: ProviderServicesService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ProviderServicesController>(
      ProviderServicesController,
    );
    service = module.get(ProviderServicesService);
    jest.clearAllMocks();
  });

  it('creates a provider service', async () => {
    const dto = { providerId: 'provider-1', serviceId: 'service-1' } as any;
    const expected = { id: 'provider-service-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('returns all provider services', async () => {
    const expected = [{ id: 'provider-service-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns provider services for one provider', async () => {
    const expected = [{ id: 'provider-service-1', providerId: 'provider-1' }];
    service.findByProvider.mockResolvedValue(expected as never);

    await expect(controller.findOne('provider-1')).resolves.toEqual(expected);
    expect(service.findByProvider).toHaveBeenCalledWith('provider-1');
  });

  it('updates a provider service', async () => {
    const dto = { providerId: 'provider-1', serviceId: 'service-1' } as any;
    const expected = { id: 'provider-service-1' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update(dto)).resolves.toEqual(expected);
    expect(service.update).toHaveBeenCalledWith(dto);
  });

  it('removes a provider service', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('provider-service-1')).resolves.toEqual(
      expected,
    );
    expect(service.remove).toHaveBeenCalledWith('provider-service-1');
  });
});
