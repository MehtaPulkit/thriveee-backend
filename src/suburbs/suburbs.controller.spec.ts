import { Test, TestingModule } from '@nestjs/testing';
import { SuburbsController } from './suburbs.controller';
import { SuburbsService } from './suburbs.service';

describe('SuburbsController', () => {
  let controller: SuburbsController;
  let service: jest.Mocked<SuburbsService>;

  const serviceMock = {
    findAll: jest.fn(),
    searchByName: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuburbsController],
      providers: [{ provide: SuburbsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<SuburbsController>(SuburbsController);
    service = module.get(SuburbsService);
    jest.clearAllMocks();
  });

  it('returns all suburbs', async () => {
    const expected = [{ id: 'suburb-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.getAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns an empty array when search query is missing', async () => {
    await expect(controller.search('')).resolves.toEqual([]);
    expect(service.searchByName).not.toHaveBeenCalled();
  });

  it('searches suburbs by name when query is provided', async () => {
    const expected = [{ id: 'suburb-1', name: 'Sydney' }];
    service.searchByName.mockResolvedValue(expected as never);

    await expect(controller.search('Syd')).resolves.toEqual(expected);
    expect(service.searchByName).toHaveBeenCalledWith('Syd');
  });

  it('returns a suburb by id', async () => {
    const expected = { id: 'suburb-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.getById('suburb-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('suburb-1');
  });
});
