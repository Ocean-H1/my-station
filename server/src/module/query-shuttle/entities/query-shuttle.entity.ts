/**
 * @Description: 线路相关实体
 * @Author: OceanH
 * @Date: 2023-09-01 18:21:03
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 线路列表
@Entity()
export class ShuttleLine {
  @PrimaryGeneratedColumn()
  line_id: number;

  @Column()
  start_region: string;

  @Column()
  final_region: string;

  @Column()
  start_region_id: number;

  @Column()
  final_region_id: number;

  @Column()
  via_regions_id: string;

  // 途经站
  @Column()
  via_regions_name: string;
}

// 班次次详情
@Entity()
export class ShuttleShift {
  @PrimaryGeneratedColumn()
  shift_id: number;

  @Column()
  shuttle_shift_date: string;

  @Column()
  shuttle_shift_time: string;

  @Column({ default: -1 })
  shuttle_line_id: number;

  @Column()
  start_station: string;

  @Column()
  final_station: string;

  @Column()
  child_ticket_quantity: number;

  @Column()
  unuse_child_ticket_quantity: number;

  @Column()
  ticket_quantity: number;

  @Column()
  unuse_ticket_quantity: number;

  @Column({ type: 'decimal' })
  ticket_price: string;

  @Column()
  shuttle_shift_type: number;

  @Column()
  line_type: number;

  @Column()
  duration: string;

  @Column({ default: 1 })
  car_id: number;

  @Column()
  full_length: string;

  @Column({ type: 'decimal', charset: 'binary' })
  insurance_price: string;

  @Column({ type: 'decimal' })
  refund_fee: string;

  @Column({ type: 'decimal' })
  station_fee: string;

  @Column({ default: 0 })
  star: number;

  @Column({ default: -1 })
  station_number: string;

  @Column({ select: false, default: 0 })
  is_delete: number;
}

// 车辆信息
@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  car_id: number;

  @Column()
  car_model: string;

  @Column()
  car_color: string;

  @Column()
  car_number: string;

  @Column({ select: false })
  contractor_name: number;
}
