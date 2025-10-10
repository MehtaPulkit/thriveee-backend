import { Test, TestingModule } from '@nestjs/testing';
import { SuburbsController } from './suburbs.controller';

describe('SuburbsController', () => {
  let controller: SuburbsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuburbsController],
    }).compile();

    controller = module.get<SuburbsController>(SuburbsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
