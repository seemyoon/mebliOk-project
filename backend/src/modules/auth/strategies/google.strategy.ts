import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { Config, GoogleAuthConfig } from '../../../configs/config.type';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly authService: AuthService,
  ) {
    const googleAuthConfig = configService.get<GoogleAuthConfig>('googleAuth');
    if (
      !googleAuthConfig?.google_client_id ||
      !googleAuthConfig?.google_client_secret
    ) {
      throw new Error('Google OAuth credentials are missing in config!');
    }

    super({
      clientID: googleAuthConfig.google_client_id,
      clientSecret: googleAuthConfig.google_client_secret,
      callbackURL: googleAuthConfig.callback_url,
      scope: ['email', 'profile'],
    });
  }

  public async validate(
    _accessTokenOauth: string,
    _refreshTokenOauth: string,
    profile: Profile,
  ) {
    const email = profile?.emails?.at(0)?.value;
    if (!email) {
      throw new UnauthorizedException('Email not found in Google profile');
    }
    const userPayload = await this.authService.createGoogleUser(email);

    if (!userPayload) {
      throw new UnauthorizedException('Invalid google email account');
    }
    return userPayload;
  }
}
