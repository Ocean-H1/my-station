import { Module } from '@nestjs/common';
import { QueryShuttleService } from './query-shuttle.service';
import { QueryShuttleController } from './query-shuttle.controller';

@Module({
  controllers: [QueryShuttleController],
  providers: [QueryShuttleService],
})
export class QueryShuttleModule {}
