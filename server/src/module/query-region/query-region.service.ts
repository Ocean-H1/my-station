import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/query-region.entity';

@Injectable()
export class QueryRegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepo: Repository<Region>,
  ) {}
  // 查询所有地区列表
  async getAllRegions() {
    return {
      region_list: await this.regionRepo.find(),
    };
  }
}
