import { Controller, UseGuards, Post, Body, Get, Query } from '@nestjs/common';
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

  // 支付接口 返回一个支付二维码
  @Get('payOrder')
  @UseGuards(AuthGuard('jwt'))
  async payOrder(@Query('master_order_number') master_order_number: string) {
    return await this.orderService.payOrder(master_order_number);
  }
}
