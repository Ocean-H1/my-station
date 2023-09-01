import { Controller, Get } from '@nestjs/common';
import { QueryRegionService } from './query-region.service';

@Controller('query/region')
export class QueryRegionController {
  constructor(private readonly queryRegionService: QueryRegionService) {}

  // 查询所有地区列表
  @Get('getAllRegions')
  async getAllRegions() {
    return await this.queryRegionService.getAllRegions();
  }
}
