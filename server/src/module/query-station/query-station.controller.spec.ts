import { Test, TestingModule } from '@nestjs/testing';
import { QueryStationController } from './query-station.controller';
import { QueryStationService } from './query-station.service';

describe('QueryStationController', () => {
  let controller: QueryStationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryStationController],
      providers: [QueryStationService],
    }).compile();

    controller = module.get<QueryStationController>(QueryStationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
