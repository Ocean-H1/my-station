/**
 * @Description: jwt验证策略配置
 * @Author: OceanH
 * @Date: 2023-09-04 11:05:06
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './entities/permissions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
    super({
      // 请求头中获取token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 密钥
      secretOrKey: config.get('TOKEN_SECRET'),
    });
  }

  async validate({ sub: user_id }) {
    // 这里返回的用户信息会被添加自动到请求对象的user属性中
    return await this.userRepo.findOne({
      where: {
        user_id,
      },
    });
  }
}
