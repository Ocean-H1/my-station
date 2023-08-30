/**
 * @Description: 后台管理模块
 * @Author: OceanH
 * @Date: 2023-08-30 10:29:57
 */
import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
