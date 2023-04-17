import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('HealthCheck')
@Controller('check')
export class HealthCheckController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly database: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => this.http.pingCheck('server', 'http://localhost:3000'),
      async () => this.database.pingCheck('database'),
    ]);
  }
}
