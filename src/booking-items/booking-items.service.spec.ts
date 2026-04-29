import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookingItemsService } from './booking-items.service';
import { BookingItem } from './booking-item.entity';

describe('BookingItemsService', () => {
  let service: BookingItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingItemsService,
        { provide: getRepositoryToken(BookingItem), useValue: {} },
      ],
    }).compile();

    service = module.get<BookingItemsService>(BookingItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
