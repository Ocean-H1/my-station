/**
 * @Description: 订单相关实体
 * @Author: OceanH
 * @Date: 2023-09-04 23:37:16
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class orderInfo {
  // 订单ID
  @PrimaryGeneratedColumn({ type: 'int' })
  order_id: number;

  // 订单编号，唯一识别订单
  @Column({ unique: true, type: 'varchar', default: null })
  order_number: string;

  // 主订单号
  @Column({ type: 'varchar', default: -1 })
  master_order_number: string;

  // 订单类型: 1主单，2子单
  @Column({ type: 'int', default: -1 })
  order_type: number;

  // 交易流水号，主单维度
  @Column({ type: 'varchar', default: -1 })
  trading_number: string;

  // 子单数量
  @Column({ default: -1, type: 'int' })
  slave_order_quantity: number;

  //订单状态: 1预订,2待支付,3已支付,4已换纸质票（主单维度）,5部分退款（主单维度）,6已退款（主单维度全部退款或子单维度单个退款）,7已完成,8已取消
  @Column({ default: -1, type: 'int' })
  order_status: number;

  // 用户id
  @Column()
  user_id: number;

  // 是否来自网络购票,1是,2否
  @Column({ default: -1, type: 'int' })
  from_online: number;

  // 乘客id
  @Column({ default: -1, type: 'int' })
  passenger_id: number;

  // 联系人id
  @Column({ default: -1, type: 'int' })
  person_id: number;

  //订单创建时间
  @Column({ type: 'bigint', default: null })
  create_time: number;

  // 乘车码
  @Column({ default: -1 })
  ride_code: string;

  // 票种:1成人票,2携童票,3半票
  @Column({ default: -1 })
  ticket_type: number;

  // 子单购保状态
  @Column({ type: 'int', default: -1 })
  insurance_status: number;

  // 班次id
  @Column({ type: 'int' })
  shuttle_shift_id: number;

  // 订单总价
  @Column()
  total_amount: string;

  // 退款金额
  @Column()
  refund_amount: string;

  // 软删除，0在使用，1已删除
  @Column({ select: false, type: 'int', default: 0 })
  is_delete: number;
}
