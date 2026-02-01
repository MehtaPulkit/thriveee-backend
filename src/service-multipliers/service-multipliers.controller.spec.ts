import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMultipliersController } from './service-multipliers.controller';

describe('ServiceMultipliersController', () => {
  let controller: ServiceMultipliersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceMultipliersController],
    }).compile();

    controller = module.get<ServiceMultipliersController>(ServiceMultipliersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
