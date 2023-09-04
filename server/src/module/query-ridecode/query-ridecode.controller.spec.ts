import { Test, TestingModule } from '@nestjs/testing';
import { QueryRidecodeController } from './query-ridecode.controller';
import { QueryRidecodeService } from './query-ridecode.service';

describe('QueryRidecodeController', () => {
  let controller: QueryRidecodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryRidecodeController],
      providers: [QueryRidecodeService],
    }).compile();

    controller = module.get<QueryRidecodeController>(QueryRidecodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
