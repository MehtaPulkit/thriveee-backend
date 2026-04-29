import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

describe('ProfilesController', () => {
  let controller: ProfilesController;
  let service: jest.Mocked<ProfilesService>;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [{ provide: ProfilesService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
    service = module.get(ProfilesService);
    jest.clearAllMocks();
  });

  it('creates a profile', async () => {
    const dto = { userId: 'user-1' } as any;
    const expected = { id: 'profile-1' };
    service.create.mockResolvedValue(expected as never);

    await expect(controller.create(dto)).resolves.toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('returns all profiles', async () => {
    const expected = [{ id: 'profile-1' }];
    service.findAll.mockResolvedValue(expected as never);

    await expect(controller.findAll()).resolves.toEqual(expected);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns one profile', async () => {
    const expected = { id: 'profile-1' };
    service.findOne.mockResolvedValue(expected as never);

    await expect(controller.findOne('profile-1')).resolves.toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('profile-1');
  });

  it('updates a profile', async () => {
    const dto = { firstName: 'Updated' } as any;
    const expected = { id: 'profile-1', firstName: 'Updated' };
    service.update.mockResolvedValue(expected as never);

    await expect(controller.update('profile-1', dto)).resolves.toEqual(
      expected,
    );
    expect(service.update).toHaveBeenCalledWith('profile-1', dto);
  });

  it('removes a profile', async () => {
    const expected = { deleted: true };
    service.remove.mockResolvedValue(expected as never);

    await expect(controller.remove('profile-1')).resolves.toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('profile-1');
  });
});
