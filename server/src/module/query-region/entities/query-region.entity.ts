import {} from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
