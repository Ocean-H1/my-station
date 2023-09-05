import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { orderInfo } from './entities/order.entity';
import { Repository } from 'typeorm';
import {
  Car,
  ShuttleLine,
  ShuttleShift,
} from '../query-shuttle/entities/query-shuttle.entity';
import { IBookOrderParams, IOrderInfo } from './types/index';
import * as moment from 'moment';
import { decimalOperator } from '../../utils/index';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(orderInfo)
    private orderInfoRepo: Repository<orderInfo>,
    @InjectRepository(ShuttleShift)
    private shuttleShiftRepo: Repository<ShuttleShift>,
    @InjectRepository(ShuttleLine)
    private shuttleLineRepo: Repository<ShuttleLine>,
    @InjectRepository(Car)
    private carRepo: Repository<Car>,
  ) {}

  // 生成订单号
  createOrderNumber() {
    // 平台码 订单号前缀
    const platform = '625';
    // 时间戳
    const sysDate = moment().format('YYYYMMDDhhmmss');
    // 随机数
    const r1 = Math.floor(Math.random() * 10);
    const r2 = Math.floor(Math.random() * 10);
    // 订单号
    const order_number = platform + r1 + sysDate + r2;

    return order_number;
  }

  // 提交预定订单
  async bookOrder(body: IBookOrderParams) {
    const { shuttle_shift_id } = body;
    if (!shuttle_shift_id) {
      throw new HttpException(
        '缺少必要参数: 班次(shuttle_shift_id)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const shuttle_shift_info = await this.shuttleShiftRepo.findOne({
      where: {
        shift_id: shuttle_shift_id,
      },
    });

    if (!shuttle_shift_info) {
      throw new HttpException('该班次信息不存在', HttpStatus.BAD_REQUEST);
    }
    // 乘客列表
    const { passenger: passengers } = body;

    if (!passengers) {
      throw new HttpException('乘客列表为空!', HttpStatus.BAD_REQUEST);
    }

    const {
      shuttle_shift_date,
      shuttle_shift_time,
      start_station,
      final_station,
      ticket_price,
      station_fee,
      insurance_price,
      shuttle_line_id,
      car_id,
    } = shuttle_shift_info;

    const { start_region, final_region } = await this.shuttleLineRepo.findOne({
      where: {
        line_id: shuttle_line_id,
      },
      select: ['start_region', 'final_region'],
    });

    const { car_model } = await this.carRepo.findOne({
      where: {
        car_id,
      },
      select: ['car_model'],
    });

    // 订单信息
    let master_total_amount = 0;
    const master_order_number = this.createOrderNumber();
    const order_info: IOrderInfo[] = [];
    for (const passenger of passengers) {
      const order: IOrderInfo = {
        order_number: this.createOrderNumber(),
        shuttle_shift_time: `${shuttle_shift_date} ${shuttle_shift_time}`,
        shuttle_shift_id: shuttle_shift_id,
        start_station: start_station,
        final_station: final_station,
        start_region,
        final_region,
        ticket_price: ticket_price,
        station_fee: station_fee,
        insurance_price: '0',
        ticket_type: passenger.ticket_type,
        passenger_name: passenger.passenger_name,
        passenger_card_number: passenger.passenger_card_number,
        passenger_type: passenger.ticket_type === '半票' ? '儿童' : '成人',
        car_model,
        total_amount: decimalOperator('add', ticket_price, station_fee),
      };
      // 保险费
      if (passenger.buying_insurance) {
        order.insurance_price = insurance_price;
        order.total_amount = decimalOperator(
          'add',
          order.total_amount,
          insurance_price,
        );
      }
      order_info.push(order);
      master_total_amount += Number(order.total_amount);
    }
    return {
      order_info,
      master_order_number,
      master_total_amount,
    };
  }
}
