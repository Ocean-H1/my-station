/**
 * @Description: 用户权限模块
 * @Author: OceanH
 * @Date: 2023-08-30 10:30:30
 */
import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

// entities
import { User } from './entities/permissions.entity';

// jwt相关
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    // 配置JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('TOKEN_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class PermissionsModule {}
