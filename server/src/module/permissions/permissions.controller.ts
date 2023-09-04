/**
 * @Description: 用户权限相关service
 * @Author: OceanH
 * @Date: 2023-09-02 12:43:28
 */
import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // 生成图片验证码
  @Get('getCheckCodePicture')
  @Header('Content-Type', 'image/svg+xml')
  async getCheckCodePicture(@Session() session, @Res() res) {
    return await this.permissionsService.getCheckCodePicture(session, res);
  }

  // 登录
  @Post('login')
  async login(
    @Body('phone_number') phone_number: string,
    @Body('password') password: string,
    @Body('check_code') check_code: string,
    @Session() session,
  ) {
    if (!phone_number || !password || !check_code) {
      throw new HttpException('缺少必要参数!', HttpStatus.BAD_REQUEST);
    }
    return await this.permissionsService.login(
      phone_number,
      password,
      check_code,
      session,
    );
  }
}
