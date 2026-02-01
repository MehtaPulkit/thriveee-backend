import { Test, TestingModule } from '@nestjs/testing';
import { ServiceComponentRatesController } from './service-component-rates.controller';

describe('ServiceComponentRatesController', () => {
  let controller: ServiceComponentRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceComponentRatesController],
    }).compile();

    controller = module.get<ServiceComponentRatesController>(ServiceComponentRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
