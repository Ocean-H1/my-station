import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './entities/query.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueryService {
  constructor(
    @InjectRepository(Station)
    private stationRepo: Repository<Station>,
  ) {}

  // 常用车站列表
  async getFamiliarStation(size: number) {
    return {
      familiar_stations_list: await this.stationRepo.find({
        select: ['station_id', 'station_name', 'station_english_name'],
        take: size,
      }),
    };
  }

  // 车站详情 & 经纬度信息
  async getAllStations() {
    return {
      station_list: await this.stationRepo.find(),
    };
  }
}
