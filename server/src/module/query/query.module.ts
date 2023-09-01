/**
 * @Description: 查询模块
 * @Author: OceanH
 * @Date: 2023-08-30 10:30:51
 */
import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import {
  Station,
  ShuttleLine,
  Region,
  ShuttleShift,
  Car,
} from './entities/query.entity';

@Module({
  controllers: [QueryController],
  providers: [QueryService],
  imports: [
    TypeOrmModule.forFeature([Station, ShuttleLine, Region, ShuttleShift, Car]),
  ],
})
export class QueryModule {}
