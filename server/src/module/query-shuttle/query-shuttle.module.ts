/**
 * @Description: 线路根模块
 * @Author: OceanH
 * @Date: 2023-09-01 18:21:29
 */
import { Module } from '@nestjs/common';
import { QueryShuttleService } from './query-shuttle.service';
import { QueryShuttleController } from './query-shuttle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import {
  ShuttleLine,
  ShuttleShift,
  Car,
} from './entities/query-shuttle.entity';
@Module({
  controllers: [QueryShuttleController],
  providers: [QueryShuttleService],
  imports: [TypeOrmModule.forFeature([ShuttleLine, ShuttleShift, Car])],
})
export class QueryShuttleModule {}
