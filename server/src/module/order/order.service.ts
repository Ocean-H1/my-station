import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { orderInfo } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(orderInfo)
    private orderInfoRepo: Repository<orderInfo>,
  ) {}

  // 提交预定订单
  async bookOrder(body) {}
}
