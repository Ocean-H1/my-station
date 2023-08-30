import { Test, TestingModule } from '@nestjs/testing';
import { UserCenterService } from './user-center.service';

describe('UserCenterService', () => {
  let service: UserCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCenterService],
    }).compile();

    service = module.get<UserCenterService>(UserCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
