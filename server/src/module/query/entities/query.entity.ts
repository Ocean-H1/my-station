/**
 * @Description: 查询相关实体
 * @Author: OceanH
 * @Date: 2023-08-30 10:58:48
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 车站信息列表
@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  station_id: number;

  @Column()
  station_name: string;

  @Column()
  station_english_name: string;

  @Column()
  station_address: string;

  // 经度
  @Column({ type: 'decimal' })
  longitude: number;

  // 纬度
  @Column({ type: 'decimal' })
  latitude: number;

  @Column()
  star: number;

  @Column()
  region_id: number;

  @Column()
  station_number: string;
}

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

// 车次详情
@Entity()
export class ShuttleShift {
  @PrimaryGeneratedColumn()
  shift_id: number;

  @Column()
  shuttle_shift_date: string;

  @Column()
  shuttle_shift_time: string;

  @Column()
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

  @Column()
  ticket_price: number;

  @Column()
  shuttle_shift_type: number;

  @Column()
  line_type: number;

  @Column()
  duration: string;

  @Column()
  car_id: number;

  @Column()
  full_length: string;

  @Column()
  insurance_price: number;

  @Column()
  refund_fee: number;

  @Column()
  station_fee: number;

  @Column()
  star: number;

  @Column()
  station_number: string;

  @Column({ select: false })
  is_delete: number;
}

// 地区列表
@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  region_id: number;

  @Column()
  region_name: string;

  @Column()
  region_english_name: string;

  @Column()
  city_name: string;

  @Column()
  province_name: string;
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
