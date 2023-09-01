import { Module } from '@nestjs/common';
import { QueryRegionService } from './query-region.service';
import { QueryRegionController } from './query-region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/query-region.entity';

@Module({
  controllers: [QueryRegionController],
  providers: [QueryRegionService],
  imports: [TypeOrmModule.forFeature([Region])],
})
export class QueryRegionModule {}
