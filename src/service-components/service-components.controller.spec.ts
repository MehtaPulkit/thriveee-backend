import { Test, TestingModule } from '@nestjs/testing';
import { ServiceComponentsController } from './service-components.controller';
import { ServiceComponentsService } from './service-components.service';

describe('ServiceComponentsController', () => {
  let controller: ServiceComponentsController;
  let service: jest.Mocked<ServiceComponentsService>;

  const serviceMock = {
    createComponent: jest.fn(),
    findAllComponents: jest.fn(),
    findOneComponent: jest.fn(),
    updateComponent: jest.fn(),
    removeComponent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceComponentsController],
      providers: [{ provide: ServiceComponentsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ServiceComponentsController>(
      ServiceComponentsController,
    );
    service = module.get(ServiceComponentsService);
    jest.clearAllMocks();
  });

  it('creates a service component', async () => {
    const dto = { name: 'Bedrooms' } as any;
    const expected = { id: 'component-1' };
    service.createComponent.mockResolvedValue(expected as never);

    await expect(controller.createComponent(dto)).resolves.toEqual(expected);
    expect(service.createComponent).toHaveBeenCalledWith(dto);
  });

  it('returns all service components', async () => {
    const expected = [{ id: 'component-1' }];
    service.findAllComponents.mockResolvedValue(expected as never);

    await expect(controller.findAllComponents()).resolves.toEqual(expected);
    expect(service.findAllComponents).toHaveBeenCalledTimes(1);
  });

  it('returns one service component', async () => {
    const expected = { id: 'component-1' };
    service.findOneComponent.mockResolvedValue(expected as never);

    await expect(controller.findOneComponent('component-1')).resolves.toEqual(
      expected,
    );
    expect(service.findOneComponent).toHaveBeenCalledWith('component-1');
  });

  it('updates a service component', async () => {
    const dto = { name: 'Bathrooms' } as any;
    const expected = { id: 'component-1', name: 'Bathrooms' };
    service.updateComponent.mockResolvedValue(expected as never);

    await expect(
      controller.updateComponent('component-1', dto),
    ).resolves.toEqual(expected);
    expect(service.updateComponent).toHaveBeenCalledWith('component-1', dto);
  });

  it('removes a service component', async () => {
    const expected = { deleted: true };
    service.removeComponent.mockResolvedValue(expected as never);

    await expect(controller.removeComponent('component-1')).resolves.toEqual(
      expected,
    );
    expect(service.removeComponent).toHaveBeenCalledWith('component-1');
  });
});
