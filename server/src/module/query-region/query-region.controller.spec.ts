import { Test, TestingModule } from '@nestjs/testing';
import { QueryRegionController } from './query-region.controller';
import { QueryRegionService } from './query-region.service';

describe('QueryRegionController', () => {
  let controller: QueryRegionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryRegionController],
      providers: [QueryRegionService],
    }).compile();

    controller = module.get<QueryRegionController>(QueryRegionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
