import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  // 查询用户权限
  @Get('checkPermission')
  @UseGuards(AuthGuard('jwt'))
  async checkPermission(@Req() req) {
    return this.managerService.checkPermission(req);
  }

  // 查询班次
  @Post('getShuttleInfoList')
  @UseGuards(AuthGuard('jwt'))
  async getShuttleInfoList(
    @Body('start_region_id') start_region_id: number,
    @Body('final_region_id') final_region_id: number,
    @Body('shuttle_shift_date') shuttle_shift_date: string,
    @Body('page') page: number,
    @Body('size') size: number,
  ) {
    if (
      !start_region_id ||
      !final_region_id ||
      !shuttle_shift_date ||
      !page ||
      !size
    ) {
      throw new HttpException('缺少必要参数!', HttpStatus.BAD_REQUEST);
    }

    return await this.managerService.getShuttleInfoList(
      start_region_id,
      final_region_id,
      shuttle_shift_date,
      page,
      size,
    );
  }
}
