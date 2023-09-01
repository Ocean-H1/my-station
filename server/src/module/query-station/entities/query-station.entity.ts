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
