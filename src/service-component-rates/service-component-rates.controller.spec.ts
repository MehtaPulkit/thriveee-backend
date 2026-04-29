import { Test, TestingModule } from '@nestjs/testing';
import { ServiceComponentRatesController } from './service-component-rates.controller';
import { ServiceComponentRatesService } from './service-component-rates.service';

describe('ServiceComponentRatesController', () => {
  let controller: ServiceComponentRatesController;
  let service: jest.Mocked<ServiceComponentRatesService>;

  const serviceMock = {
    createRate: jest.fn(),
    findAllRates: jest.fn(),
    findOneRate: jest.fn(),
    updateRate: jest.fn(),
    deleteRate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceComponentRatesController],
      providers: [
        { provide: ServiceComponentRatesService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<ServiceComponentRatesController>(
      ServiceComponentRatesController,
    );
    service = module.get(ServiceComponentRatesService);
    jest.clearAllMocks();
  });

  it('creates a service component rate', async () => {
    const dto = { serviceComponentId: 'component-1', rate: 50 } as any;
    const expected = { id: 'rate-1' };
    service.createRate.mockResolvedValue(expected as never);

    await expect(controller.createRate(dto)).resolves.toEqual(expected);
    expect(service.createRate).toHaveBeenCalledWith(dto);
  });

  it('returns all service component rates', async () => {
    const expected = [{ id: 'rate-1' }];
    service.findAllRates.mockResolvedValue(expected as never);

    await expect(controller.findAllRates()).resolves.toEqual(expected);
    expect(service.findAllRates).toHaveBeenCalledTimes(1);
  });

  it('returns one service component rate', async () => {
    const expected = { id: 'rate-1' };
    service.findOneRate.mockResolvedValue(expected as never);

    await expect(controller.findOneComponent('rate-1')).resolves.toEqual(
      expected,
    );
    expect(service.findOneRate).toHaveBeenCalledWith('rate-1');
  });

  it('updates a service component rate', async () => {
    const dto = { rate: 55 } as any;
    const expected = { id: 'rate-1', rate: 55 };
    service.updateRate.mockResolvedValue(expected as never);

    await expect(controller.updateRate('rate-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.updateRate).toHaveBeenCalledWith('rate-1', dto);
  });

  it('deletes a service component rate', async () => {
    const expected = { deleted: true };
    service.deleteRate.mockResolvedValue(expected as never);

    await expect(controller.deleteRate('rate-1')).resolves.toEqual(expected);
    expect(service.deleteRate).toHaveBeenCalledWith('rate-1');
  });
});
