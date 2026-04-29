import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';

describe('ProvidersController', () => {
  let controller: ProvidersController;
  let service: jest.Mocked<ProvidersService>;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
      providers: [{ provide: ProvidersService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ProvidersController>(ProvidersController);
    service = module.get(ProvidersService);
    jest.clearAllMocks();
  });

  it('creates a provider', async () => {
    const dto = { email: 'provider@example.com' } as any;
    const expected = { id: 'provider-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('returns all providers', async () => {
    const expected = [{ id: 'provider-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns one provider', async () => {
    const expected = { id: 'provider-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('provider-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('provider-1');
  });

  it('updates a provider', async () => {
    const dto = { firstName: 'Updated' } as any;
    const expected = { id: 'provider-1', firstName: 'Updated' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('provider-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.update).toHaveBeenCalledWith('provider-1', dto);
  });

  it('removes a provider', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('provider-1')).resolves.toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('provider-1');
  });
});
