/**
 * @Description: 订单模块
 * @Author: OceanH
 * @Date: 2023-08-30 10:30:15
 */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderInfo } from './entities/order.entity';
import {
  Car,
  ShuttleLine,
  ShuttleShift,
} from '../query-shuttle/entities/query-shuttle.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([orderInfo, ShuttleShift, Car, ShuttleLine]),
  ],
})
export class OrderModule {}
