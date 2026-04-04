import { Test, TestingModule } from '@nestjs/testing';
import { ServiceComponentsController } from './service-components.controller';

describe('ServiceComponentsController', () => {
  let controller: ServiceComponentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceComponentsController],
    }).compile();

    controller = module.get<ServiceComponentsController>(
      ServiceComponentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
