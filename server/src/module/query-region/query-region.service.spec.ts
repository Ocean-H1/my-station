import { Test, TestingModule } from '@nestjs/testing';
import { QueryRegionService } from './query-region.service';

describe('QueryRegionService', () => {
  let service: QueryRegionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryRegionService],
    }).compile();

    service = module.get<QueryRegionService>(QueryRegionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
