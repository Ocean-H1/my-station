/**
 * @Description: 后台管理模块
 * @Author: OceanH
 * @Date: 2023-08-30 10:29:57
 */
import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ShuttleLine,
  ShuttleShift,
} from '../query-shuttle/entities/query-shuttle.entity';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
  imports: [TypeOrmModule.forFeature([ShuttleLine, ShuttleShift])],
})
export class ManagerModule {}
