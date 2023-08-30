/**
 * @Description: 订单模块
 * @Author: OceanH
 * @Date: 2023-08-30 10:30:15
 */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
