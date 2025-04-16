import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { emailConstants } from '../../../common/constants/email.constants';
import { EmailTypeToPayloadType } from '../../../common/types/email-type-to-payload.type';
import { AppFrontUrl, Config } from '../../../configs/config.type';
import { EmailTypeEnum } from '../enum/email.enum';

@Injectable()
export class MailService {
  private readonly appFrontUrl: AppFrontUrl;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.appFrontUrl = configService.get<AppFrontUrl>('appFrontUrl');
  }

  public async sendEmail<T extends EmailTypeEnum>(
    to: string,
    type: T,
    context: EmailTypeToPayloadType[T],
  ): Promise<void> {
    // const mailConfig = this.configService.get('mail');
    const { subject, template } = emailConstants[type];
    context['frontUrl'] = this.appFrontUrl.appFrontUrl;

    await this.mailerService.sendMail({
      // to: [email, mailConfig.email], we set mailConfig.email, if:
      // if you need to duplicate a letter to a technical email (for example, for logging).
      // if the mail must be sent to a verification email according to the system requirements.
      to,
      subject,
      template,
      context,
    });
  }
}
