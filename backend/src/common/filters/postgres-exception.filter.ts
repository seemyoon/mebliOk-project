import { ArgumentsHost, Catch } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { LoggerService } from '../../modules/logger/services/logger.service';

@Catch(QueryFailedError)
export class TypeORMQueryExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    let status: number;
    let message: string;

    const sqlStateCode = (exception as any).driverError?.code;
    switch (sqlStateCode) {
      case '22P02':
        status = 400;
        message = 'Incorrect input format';
        break;
      case '23505':
        status = 400;
        message = 'Such a record already exists';
        break;
      case '23503':
        status = 400;
        message = 'Could not find related record';
        break;
      case '23502':
        status = 400;
        message = 'Required field cannot be empty';
        break;
      default:
        status = 500;
        message = 'Database error';
        this.logger.error(exception);
    }

    this.logger.error(`DB error: ${message}`);
    res.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
