/**
 * @Description: 用户权限模块
 * @Author: OceanH
 * @Date: 2023-08-30 10:30:30
 */
import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
