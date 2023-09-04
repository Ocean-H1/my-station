import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import * as svgCaptcha from 'svg-captcha';
import { User } from './entities/permissions.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
  ) {}

  // 获取图片验证码
  async getCheckCodePicture(session, res: Response) {
    // 生成验证码对象
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      fontSize: 50,
      background: '#94b5ea',
      width: 110,
      height: 38,
    });
    session.code = captcha.text;
    res.send(captcha.data);
  }

  // 生成token
  generateToken({ user_id, phone_number }: User) {
    return {
      token: this.jwt.sign({ phone_number, sub: user_id }),
    };
  }

  // 登 录
  async login(
    phone_number: string,
    password: string,
    check_code: string,
    session,
  ) {
    const sessionCode = String(session.code);

    if (check_code !== sessionCode) {
      throw new HttpException(
        '验证码错误,请检查后重试!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 根据手机号取出用户信息
    const user_info = await this.userRepo.findOne({
      where: {
        phone_number,
      },
    });

    if (!user_info) {
      throw new HttpException('该手机号尚未注册用户!', HttpStatus.BAD_REQUEST);
    }

    if (password !== user_info.password) {
      throw new HttpException('密码错误!', HttpStatus.BAD_REQUEST);
    }

    // 登录成功
    return this.generateToken(user_info);
  }
}
