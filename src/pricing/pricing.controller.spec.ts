import { Test, TestingModule } from '@nestjs/testing';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

describe('PricingController', () => {
  let controller: PricingController;
  let service: jest.Mocked<PricingService>;

  const serviceMock = {
    getPricingConfig: jest.fn(),
    calculatePrice: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricingController],
      providers: [{ provide: PricingService, useValue: serviceMock }],
    }).compile();

    controller = module.get<PricingController>(PricingController);
    service = module.get(PricingService);
    jest.clearAllMocks();
  });

  it('returns pricing config for a service', async () => {
    const expected = { serviceId: 'service-1', components: [] };
    service.getPricingConfig.mockResolvedValue(expected as never);

    await expect(controller.getPricingConfig('service-1')).resolves.toEqual(
      expected,
    );
    expect(service.getPricingConfig).toHaveBeenCalledWith('service-1');
  });

  it('calculates a price', async () => {
    const dto = {
      serviceId: 'service-1',
      items: [{ componentId: 'component-1', quantity: 2 }],
      appliedMultipliers: ['multiplier-1'],
    } as any;
    const expected = { total: 120 };
    service.calculatePrice.mockResolvedValue(expected as never);

    await expect(controller.calculate(dto)).resolves.toEqual(expected);
    expect(service.calculatePrice).toHaveBeenCalledWith(
      dto.serviceId,
      dto.items,
      dto.appliedMultipliers,
    );
  });
});
