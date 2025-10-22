import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSubcategoriesController } from './service-subcategories.controller';

describe('ServiceSubcategoriesController', () => {
  let controller: ServiceSubcategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceSubcategoriesController],
    }).compile();

    controller = module.get<ServiceSubcategoriesController>(ServiceSubcategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
