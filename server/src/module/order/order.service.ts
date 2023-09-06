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
import { decimalStringOperator } from '../../utils/index';
import AlipayFormData from 'alipay-sdk/lib/form';
import { alipaySdk } from 'src/config/alipay/alipay';
import stringRandom from 'string-random';

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
  createOrderNumber(op?: string) {
    // 平台码 订单号前缀
    const childCode = '625'; // 子订单号前缀
    const masterCode = '713'; // 主订单号前缀
    // 时间戳
    const sysDate = moment().format('YYYYMMDDhhmmss');
    // 随机数
    const r1 = Math.floor(Math.random() * 10);
    const r2 = Math.floor(Math.random() * 10);
    // 订单号
    const order_number =
      (op === 'master' ? masterCode : childCode) + r1 + sysDate + r2;

    return order_number;
  }

  // 提交订单(创建订单)
  async bookOrder(body: IBookOrderParams, req) {
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
    let master_total_amount = '0';
    const master_order_number = this.createOrderNumber('master');
    const order_info: IOrderInfo[] = [];
    const create_time = Number(moment().format('YYYYMMDDhhmmss'));
    const { user_id } = req.user;
    enum TicketEnum {
      '成人票' = 1,
      '携童票' = 2,
      '半票' = 3,
    }
    // 生成6位乘车码
    const ride_code = stringRandom(6);
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
        total_amount: decimalStringOperator('add', ticket_price, station_fee),
      };
      // 保险费
      if (passenger.buying_insurance) {
        order.insurance_price = insurance_price;
        order.total_amount = decimalStringOperator(
          'add',
          order.total_amount,
          insurance_price,
        );
      }
      order_info.push(order);
      master_total_amount = decimalStringOperator(
        'add',
        master_total_amount,
        order.total_amount,
      );

      // 保存子订单信息
      await this.orderInfoRepo.save({
        order_number: order.order_number,
        order_type: 2,
        user_id,
        shuttle_shift_id,
        total_amount: order.total_amount,
        create_time,
        master_order_number,
        passenger_id: passenger.passenger_id,
        insurance_status: passenger.buying_insurance ? 1 : -1,
        ticket_type: TicketEnum[passenger.ticket_type],
        person_id: body.contact_person_id,
        ride_code,
      });
    }

    // 保存主订单信息
    await this.orderInfoRepo.save({
      order_number: master_order_number,
      order_type: 1,
      user_id,
      shuttle_shift_id,
      total_amount: master_total_amount,
      create_time,
      order_status: 1, // 预定状态
    });
    return {
      order_info,
      master_order_number,
      master_total_amount,
    };
  }

  // 手机支付接口  返回一个支付二维码
  async payOrder(master_order_number, start_region, final_region, req) {
    // 用户名
    const user_name = req.user.name;

    // 订单总金额
    const { total_amount } = await this.orderInfoRepo.findOne({
      where: {
        master_order_number,
      },
      select: ['total_amount'],
    });

    //开始对接支付宝API
    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');
    //支付时信息
    formData.addField('bizContent', {
      outTradeNo: master_order_number, //订单号
      productCode: 'FAST_INSTANT_TRADE_PAY',
      totalAmount: total_amount, //总金额
      subject: `${user_name}的订单: ${start_region}->${final_region}`, //商品名称
    });
    //支付成功或者失败跳转的链接
    formData.addField(
      'returnUrl',
      'http://localhost:8080/purchase/getRideCode',
    );
    //返回promise
    const result = alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      { formData: formData },
    );

    //对接支付宝成功，返回支付页面的链接地址
    return result;
  }

  // 查询乘车码
  async getRideCode(master_order_number: string) {
    const { ride_code } = await this.orderInfoRepo.findOne({
      where: {
        master_order_number,
      },
    });
    // if (!ride_code || ride_code === '-1') {
    //   throw
    // }
    return {
      ride_code,
    };
  }
}
