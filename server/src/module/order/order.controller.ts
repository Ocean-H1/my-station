import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 提交预定订单
  @Post('bookOrder')
  @UseGuards(AuthGuard('jwt'))
  async bookOrder(@Body() body, @Req() req) {
    return await this.orderService.bookOrder(body, req);
  }

  // 支付接口 返回一个支付二维码
  @Get('payOrder')
  @UseGuards(AuthGuard('jwt'))
  async payOrder(
    @Query('master_order_number') master_order_number: string,
    @Query('start_region') start_region: string,
    @Query('final_region') final_region: string,
    @Req() req,
  ) {
    if (!master_order_number) {
      throw new HttpException('缺少必要参数(订单号)!', HttpStatus.BAD_REQUEST);
    }
    return await this.orderService.payOrder(
      master_order_number,
      start_region,
      final_region,
      req,
    );
  }

  // 查询乘车码
  @Get('getRideCode')
  @UseGuards(AuthGuard('jwt'))
  async getRideCode(@Query('master_order_number') master_order_number: string) {
    if (!master_order_number) {
      throw new HttpException(
        '缺少必要参数,订单号不存在!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.orderService.getRideCode(master_order_number);
  }
}
