import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query,
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

  // 新建班次
  @Post('createShuttleInfo')
  @UseGuards(AuthGuard('jwt'))
  async createShuttleInfo(@Body() body) {
    return await this.managerService.createShuttleInfo(body);
  }

  // 修改班次状态
  @Get('changeShuttleStatus')
  @UseGuards(AuthGuard('jwt'))
  async changeShuttleStatus(
    @Query('shift_id') shift_id: number,
    @Query('new_status') new_status: string,
  ) {
    if (!shift_id || !new_status) {
      throw new HttpException(`缺少必要参数!`, HttpStatus.BAD_REQUEST);
    }
    return await this.managerService.changeShuttleStatus(shift_id, new_status);
  }
}
