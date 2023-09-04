import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerService {
  constructor() {}

  // 用户权限校验
  async checkPermission(req) {
    const { perms } = req.user;
    return {
      // 用户权限等级
      perms_level: perms,
    };
  }
}
