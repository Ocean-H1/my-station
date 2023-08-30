/**
 * @Description: 查询模块
 * @Author: OceanH
 * @Date: 2023-08-30 10:30:51
 */
import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Station } from './entities/query.entity';

@Module({
  controllers: [QueryController],
  providers: [QueryService],
  imports: [TypeOrmModule.forFeature([Station])],
})
export class QueryModule {}
