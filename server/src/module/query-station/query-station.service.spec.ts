import { Test, TestingModule } from '@nestjs/testing';
import { QueryStationService } from './query-station.service';

describe('QueryStationService', () => {
  let service: QueryStationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryStationService],
    }).compile();

    service = module.get<QueryStationService>(QueryStationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
