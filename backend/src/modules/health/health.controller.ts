import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Application lifecycle')
@Controller('health')
export class HealthController {
  @ApiOperation({ summary: 'Checking application health' })
  @Get()
  public checkHealth(): string {
    return "Hi, I'm working!";
  }
}
