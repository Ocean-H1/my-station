import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 配置数据库连接
import { TypeOrmModule } from '@nestjs/typeorm';

// 模块
import { PermissionsModule } from './module/permissions/permissions.module';
import { UserCenterModule } from './module/user-center/user-center.module';
import { OrderModule } from './module/order/order.module';
import { ManagerModule } from './module/manager/manager.module';
import { QueryStationModule } from './module/query-station/query-station.module';
import { QueryShuttleModule } from './module/query-shuttle/query-shuttle.module';
import { QueryRegionModule } from './module/query-region/query-region.module';

@Module({
  imports: [
    // 配置数据库连接
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hyy0128',
      database: 'coach_station',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    PermissionsModule,
    UserCenterModule,
    OrderModule,
    ManagerModule,
    QueryStationModule,
    QueryShuttleModule,
    QueryRegionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
