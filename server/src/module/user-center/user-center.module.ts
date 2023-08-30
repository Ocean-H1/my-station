/**
 * @Description: 用户个人中心模块
 * @Author: OceanH
 * @Date: 2023-08-30 10:31:03
 */
import { Module } from '@nestjs/common';
import { UserCenterService } from './user-center.service';
import { UserCenterController } from './user-center.controller';

@Module({
  controllers: [UserCenterController],
  providers: [UserCenterService],
})
export class UserCenterModule {}
