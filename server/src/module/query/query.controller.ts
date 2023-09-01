import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
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

  // 常见线路列表
  @Get('shuttle/getFamiliarShuttles')
  async getFamiliarShuttles(@Query('size') size: number = 4) {
    return await this.queryService.getFamiliarShuttles(size);
  }

  // 查询所有地区列表
  @Get('/region/getAllRegions')
  async getAllRegions() {
    return await this.queryService.getAllRegions();
  }

  // 查询符合条件的班次列表
  @Get('shuttle/getShuttleList')
  async getShuttleList(
    @Query('start_region_id') start_region_id: number,
    @Query('final_region_id') final_region_id: number,
    @Query('shuttle_shift_date') shuttle_shift_date: string,
  ) {
    if (!start_region_id || !final_region_id || !shuttle_shift_date) {
      throw new HttpException('缺少必要参数!', HttpStatus.BAD_REQUEST);
    }
    return await this.queryService.getShuttleList(
      start_region_id,
      final_region_id,
      shuttle_shift_date,
    );
  }
}
