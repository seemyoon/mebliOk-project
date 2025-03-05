import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';

@SkipAuth()
@ApiTags('Application lifecycle')
@Controller('health')
export class HealthController {
  @ApiOperation({ summary: 'Checking application health' })
  @Get()
  public checkHealth(): string {
    return "Hi, I'm working!";
  }
}
