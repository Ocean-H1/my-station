import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('checkPermission')
  @UseGuards(AuthGuard('jwt'))
  async checkPermission(@Req() req) {
    return this.managerService.checkPermission(req);
  }
}
