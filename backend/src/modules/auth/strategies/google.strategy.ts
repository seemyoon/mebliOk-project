import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Config, GoogleAuthConfig } from '../../../configs/config.type';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<Config>,
    private authService: AuthService,
  ) {
    const googleAuthConfig = configService.get<GoogleAuthConfig>('googleAuth');

    super({
      clientID: googleAuthConfig.google_client_id,
      clientSecret: googleAuthConfig.google_client_secret,
      callbackURL: googleAuthConfig.callback_url,
      scope: ['email', 'profile'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      const userData = {
        email: profile.emails[0]?.value,
        phoneNumber: profile.phone || '',
        name: profile.name?.givenName,
        avatar: profile.photos[0]?.value,
        accessToken,
        refreshToken,
        password: '',
      };

      const { user, tokens } =
        await this.authService.validateGoogleUser(userData);

      done(null, { user, tokens });
    } catch (error) {
      done(error, false);
    }
  }
}
