import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

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
    accessTokenOauth: string,
    refreshTokenOauth: string,
    profile: any,
  ) {
    // console.log('Google validate START:', {
    //   accessTokenOauth,
    //   profile,
    // });
    const { emails, photos } = profile;
    const userData = {
      email: emails?.[0]?.value,
      password: null,
      name: profile?.displayName,
      phoneNumber: null,
      avatar: photos?.[0]?.value,
    };

    return await this.authService.validateGoogleUser(
      userData,
      accessTokenOauth,
      refreshTokenOauth,
    );
  }
}
