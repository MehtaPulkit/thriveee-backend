import { Test, TestingModule } from '@nestjs/testing';
import { ProviderSuburbsController } from './provider-suburbs.controller';
import { ProviderSuburbsService } from './provider-suburbs.service';

describe('ProviderSuburbsController', () => {
  let controller: ProviderSuburbsController;
  let service: jest.Mocked<ProviderSuburbsService>;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByProvider: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderSuburbsController],
      providers: [{ provide: ProviderSuburbsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ProviderSuburbsController>(ProviderSuburbsController);
    service = module.get(ProviderSuburbsService);
    jest.clearAllMocks();
  });

  it('creates a provider suburb link', async () => {
    const dto = { providerId: 'provider-1', suburbId: 'suburb-1' } as any;
    const expected = { id: 'provider-suburb-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('returns all provider suburb links', async () => {
    const expected = [{ id: 'provider-suburb-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns suburb links for one provider', async () => {
    const expected = [{ id: 'provider-suburb-1', providerId: 'provider-1' }];
    service.findByProvider.mockResolvedValue(expected as never);

    await expect(controller.findOne('provider-1')).resolves.toEqual(expected);
    expect(service.findByProvider).toHaveBeenCalledWith('provider-1');
  });

  it('updates a provider suburb link', async () => {
    const dto = { suburbId: 'suburb-2' } as any;
    const expected = { id: 'provider-suburb-1', suburbId: 'suburb-2' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('provider-suburb-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.update).toHaveBeenCalledWith('provider-suburb-1', dto);
  });

  it('removes a provider suburb link', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('provider-suburb-1')).resolves.toEqual(
      expected,
    );
    expect(service.remove).toHaveBeenCalledWith('provider-suburb-1');
  });
});
