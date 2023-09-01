import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { QueryShuttleService } from './query-shuttle.service';

@Controller('query/shuttle')
export class QueryShuttleController {
  constructor(private readonly queryShuttleService: QueryShuttleService) {}

  // 常见线路列表
  @Get('getFamiliarShuttles')
  async getFamiliarShuttles(@Query('size') size: number = 4) {
    return await this.queryShuttleService.getFamiliarShuttles(size);
  }

  // 查询符合条件的班次列表
  @Get('getShuttleList')
  async getShuttleList(
    @Query('start_region_id') start_region_id: number,
    @Query('final_region_id') final_region_id: number,
    @Query('shuttle_shift_date') shuttle_shift_date: string,
  ) {
    if (!start_region_id || !final_region_id || !shuttle_shift_date) {
      throw new HttpException('缺少必要参数!', HttpStatus.BAD_REQUEST);
    }
    return await this.queryShuttleService.getShuttleList(
      start_region_id,
      final_region_id,
      shuttle_shift_date,
    );
  }
}
