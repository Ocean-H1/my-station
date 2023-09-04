import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../permissions/entities/permissions.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QueryRidecodeService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async sendRideCode(phone_number: string, check_code: string, session) {
    const sessionCode = session.code as string;

    if (check_code.toLowerCase() !== sessionCode.toLowerCase()) {
      throw new HttpException(
        '验证码错误,请检查后重试!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user_info = await this.userRepo.findOne({
      where: {
        phone_number,
      },
    });

    if (!user_info) {
      throw new HttpException(
        `手机号为 ${phone_number} 的用户不存在!`,
        HttpStatus.BAD_REQUEST,
      );
    }
    // 调用短信接口返回乘车码

    return {};
  }
}
