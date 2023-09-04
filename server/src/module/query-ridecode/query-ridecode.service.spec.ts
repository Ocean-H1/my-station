import { Test, TestingModule } from '@nestjs/testing';
import { QueryRidecodeService } from './query-ridecode.service';

describe('QueryRidecodeService', () => {
  let service: QueryRidecodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryRidecodeService],
    }).compile();

    service = module.get<QueryRidecodeService>(QueryRidecodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
