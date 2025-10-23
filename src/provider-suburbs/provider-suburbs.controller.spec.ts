import { Test, TestingModule } from '@nestjs/testing';
import { ProviderSuburbsController } from './provider-suburbs.controller';

describe('ProviderSuburbsController', () => {
  let controller: ProviderSuburbsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderSuburbsController],
    }).compile();

    controller = module.get<ProviderSuburbsController>(ProviderSuburbsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
