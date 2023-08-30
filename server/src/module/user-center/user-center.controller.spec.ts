import { Test, TestingModule } from '@nestjs/testing';
import { UserCenterController } from './user-center.controller';
import { UserCenterService } from './user-center.service';

describe('UserCenterController', () => {
  let controller: UserCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCenterController],
      providers: [UserCenterService],
    }).compile();

    controller = module.get<UserCenterController>(UserCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
