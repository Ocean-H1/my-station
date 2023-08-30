import { Controller, Get, Query } from '@nestjs/common';
import { QueryService } from './query.service';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  // 常见车站列表
  @Get('station/getFamiliarStation')
  async getFamiliarStation(@Query('size') size: number = 10) {
    return await this.queryService.getFamiliarStation(size);
  }

  // 车站详细信息 & 经纬度
  @Get('station/getAllStations')
  async getAllStations() {
    return await this.queryService.getAllStations();
  }
}
