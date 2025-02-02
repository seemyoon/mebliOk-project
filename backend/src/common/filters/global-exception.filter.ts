import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggerService } from '../../modules/logger/services/logger.service';

@Catch(HttpException)
export class GlobalExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    let status: number;
    let messages: string | string[];
    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      messages = (exception as any).response.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      messages = exception.message;
    } else {
      status = 500;
      messages = 'Internal server error';
      this.logger.error(exception);
    }

    this.logger.error(exception);
    res.status(status).json({
      statusCode: status,
      messages: Array.isArray(messages) ? messages : [messages],
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
