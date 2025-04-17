import * as path from 'node:path';
import * as process from 'node:process';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { Config } from '../../configs/config.type';
import { MailService } from './service/mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config>) => {
        const config = configService.get('mail');

        const transport = {
          service: 'gmail',
          auth: {
            user: config.email,
            pass: config.password,
            //     when i'm going to start use googleOAuth2, i need to use the following configuration:
            //     auth: {
            //     type: 'OAuth2',
            //     user: config.email,
            //     clientId: config.clientId,
            //     clientSecret: config.clientSecret,
            //     refreshToken: config.refreshToken,
            //     accessToken: config.accessToken,
            //   },
          },
        };

        return {
          transport,
          defaults: {
            from: `"No Reply" <${config.email}>`,
          },
          template: {
            dir: path.join(process.cwd(), 'src', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
