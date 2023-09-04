import { Module } from '@nestjs/common';
import { QueryRidecodeService } from './query-ridecode.service';
import { QueryRidecodeController } from './query-ridecode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../permissions/entities/permissions.entity';

@Module({
  controllers: [QueryRidecodeController],
  providers: [QueryRidecodeService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class QueryRidecodeModule {}
