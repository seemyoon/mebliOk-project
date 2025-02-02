import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger();

  public log(message: string): void {
    console.log(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(error: any): void {
    this.logger.error(error);
  }
}
