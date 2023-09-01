import { Controller } from '@nestjs/common';
import { QueryShuttleService } from './query-shuttle.service';

@Controller('query-shuttle')
export class QueryShuttleController {
  constructor(private readonly queryShuttleService: QueryShuttleService) {}
}
