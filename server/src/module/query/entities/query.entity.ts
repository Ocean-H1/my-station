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
  @Column()
  longitude: string;

  // 纬度
  @Column()
  latitude: string;

  @Column()
  star: number;

  @Column()
  region_id: number;

  @Column()
  station_number: string;
}
