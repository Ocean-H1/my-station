import { Controller } from '@nestjs/common';
import { UserCenterService } from './user-center.service';

@Controller('user-center')
export class UserCenterController {
  constructor(private readonly userCenterService: UserCenterService) {}
}
