import { Test, TestingModule } from '@nestjs/testing';
import { QueryShuttleController } from './query-shuttle.controller';
import { QueryShuttleService } from './query-shuttle.service';

describe('QueryShuttleController', () => {
  let controller: QueryShuttleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryShuttleController],
      providers: [QueryShuttleService],
    }).compile();

    controller = module.get<QueryShuttleController>(QueryShuttleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
