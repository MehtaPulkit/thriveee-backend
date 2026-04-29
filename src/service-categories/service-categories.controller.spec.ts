import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCategoriesController } from './service-categories.controller';
import { ServiceCategoriesService } from './service-categories.service';

describe('ServiceCategoriesController', () => {
  let controller: ServiceCategoriesController;
  let service: jest.Mocked<ServiceCategoriesService>;

  const serviceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceCategoriesController],
      providers: [
        { provide: ServiceCategoriesService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<ServiceCategoriesController>(
      ServiceCategoriesController,
    );
    service = module.get(ServiceCategoriesService);
    jest.clearAllMocks();
  });

  it('returns all service categories', async () => {
    const expected = [{ id: 'category-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns one service category', async () => {
    const expected = { id: 'category-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('category-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('category-1');
  });

  it('creates a service category', async () => {
    const dto = { name: 'Cleaning' } as any;
    const expected = { id: 'category-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('updates a service category', async () => {
    const dto = { name: 'Updated Cleaning' };
    const expected = { id: 'category-1', name: 'Updated Cleaning' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('category-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.update).toHaveBeenCalledWith('category-1', dto);
  });

  it('removes a service category', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('category-1')).resolves.toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('category-1');
  });
});
