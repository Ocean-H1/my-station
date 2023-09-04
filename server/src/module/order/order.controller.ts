import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 提交预定订单
  @Post('bookOrder')
  @UseGuards(AuthGuard('jwt'))
  async bookOrder(@Body() body) {
    return await this.orderService.bookOrder(body);
  }
}
