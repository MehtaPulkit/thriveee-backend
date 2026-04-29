import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSubcategoriesController } from './service-subcategories.controller';
import { ServiceSubcategoriesService } from './service-subcategories.service';

describe('ServiceSubcategoriesController', () => {
  let controller: ServiceSubcategoriesController;
  let service: jest.Mocked<ServiceSubcategoriesService>;

  const serviceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceSubcategoriesController],
      providers: [
        { provide: ServiceSubcategoriesService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<ServiceSubcategoriesController>(
      ServiceSubcategoriesController,
    );
    service = module.get(ServiceSubcategoriesService);
    jest.clearAllMocks();
  });

  it('returns all subcategories when no category filter is provided', async () => {
    const expected = [{ id: 'subcategory-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledWith(undefined);
  });

  it('returns filtered subcategories when categoryId is provided', async () => {
    const expected = [{ id: 'subcategory-1', categoryId: 'category-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll('category-1')).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledWith('category-1');
  });

  it('returns one subcategory', async () => {
    const expected = { id: 'subcategory-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('subcategory-1')).resolves.toEqual(
      expected,
    );
    expect(service.findOne).toHaveBeenCalledWith('subcategory-1');
  });

  it('creates a subcategory', async () => {
    const dto = { name: 'End of lease' } as any;
    const expected = { id: 'subcategory-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('updates a subcategory', async () => {
    const dto = { name: 'Deep clean' } as any;
    const expected = { id: 'subcategory-1', name: 'Deep clean' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('subcategory-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.update).toHaveBeenCalledWith('subcategory-1', dto);
  });

  it('removes a subcategory', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('subcategory-1')).resolves.toEqual(
      expected,
    );
    expect(service.remove).toHaveBeenCalledWith('subcategory-1');
  });
});
