import { Controller, Get, Query } from '@nestjs/common';
import { QueryStationService } from './query-station.service';

@Controller('query/station')
export class QueryStationController {
  constructor(private readonly queryStationService: QueryStationService) {}

  // 常见车站列表
  @Get('getFamiliarStation')
  async getFamiliarStation(@Query('size') size: number = 10) {
    return await this.queryStationService.getFamiliarStation(size);
  }

  // 车站详细信息 & 经纬度
  @Get('getAllStations')
  async getAllStations() {
    return await this.queryStationService.getAllStations();
  }
}
