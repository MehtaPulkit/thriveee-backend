import { Test, TestingModule } from '@nestjs/testing';
import { ServiceExplorerController } from './service-explorer.controller';

describe('ServiceExplorerController', () => {
  let controller: ServiceExplorerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceExplorerController],
    }).compile();

    controller = module.get<ServiceExplorerController>(
      ServiceExplorerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
