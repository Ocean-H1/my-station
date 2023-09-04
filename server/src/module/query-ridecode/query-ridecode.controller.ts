import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Session,
} from '@nestjs/common';
import { QueryRidecodeService } from './query-ridecode.service';

@Controller('query/rideCode')
export class QueryRidecodeController {
  constructor(private readonly queryRidecodeService: QueryRidecodeService) {}

  @Get('sendRideCode')
  async sendRideCode(
    @Query('phone_number') phone_number,
    @Query('check_code') check_code,
    @Session() session,
  ) {
    if (!phone_number || !check_code) {
      throw new HttpException('缺少必要参数!', HttpStatus.BAD_REQUEST);
    }

    return await this.queryRidecodeService.sendRideCode(
      phone_number,
      check_code,
      session,
    );
  }
}
