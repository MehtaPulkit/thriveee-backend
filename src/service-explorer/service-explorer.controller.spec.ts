import { Test, TestingModule } from '@nestjs/testing';
import { ServiceExplorerController } from './service-explorer.controller';
import { ServiceExplorerService } from './service-explorer.service';

describe('ServiceExplorerController', () => {
  let controller: ServiceExplorerController;
  let service: jest.Mocked<ServiceExplorerService>;

  const serviceMock = {
    getServicesBySuburb: jest.fn(),
    getServicesBySuburbName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceExplorerController],
      providers: [{ provide: ServiceExplorerService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ServiceExplorerController>(ServiceExplorerController);
    service = module.get(ServiceExplorerService);
    jest.clearAllMocks();
  });

  it('returns services for a suburb id', async () => {
    const expected = [{ id: 'service-1' }];
    service.getServicesBySuburb.mockResolvedValue(expected as never);

    await expect(
      controller.getServicesBySuburb({ suburbId: 'suburb-1' }),
    ).resolves.toEqual(expected);
    expect(service.getServicesBySuburb).toHaveBeenCalledWith('suburb-1');
  });

  it('returns services for a suburb name', async () => {
    const expected = [{ id: 'service-1' }];
    service.getServicesBySuburbName.mockResolvedValue(expected as never);

    await expect(
      controller.getServicesBySuburbName({ suburbName: 'Sydney' }),
    ).resolves.toEqual(expected);
    expect(service.getServicesBySuburbName).toHaveBeenCalledWith('Sydney');
  });
});
