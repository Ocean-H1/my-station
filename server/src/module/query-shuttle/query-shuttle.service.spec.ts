import { Test, TestingModule } from '@nestjs/testing';
import { QueryShuttleService } from './query-shuttle.service';

describe('QueryShuttleService', () => {
  let service: QueryShuttleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryShuttleService],
    }).compile();

    service = module.get<QueryShuttleService>(QueryShuttleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
