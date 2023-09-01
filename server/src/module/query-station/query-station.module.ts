import { Module } from '@nestjs/common';
import { QueryStationService } from './query-station.service';
import { QueryStationController } from './query-station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Station } from './entities/query-station.entity';

@Module({
  controllers: [QueryStationController],
  providers: [QueryStationService],
  imports: [TypeOrmModule.forFeature([Station])],
})
export class QueryStationModule {}
