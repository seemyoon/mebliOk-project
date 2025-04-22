import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { Config, GoogleAuthConfig } from '../../../configs/config.type';
import { UserEntity } from '../../../infrastructure/postgres/entities/users.entity';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserEnum } from '../../user/enum/users.enum';
import { UserMapper } from '../../user/services/user.mapper';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userRepository: UserRepository,
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
    const isVerified = profile?.emails?.at(0)?.value;
    if (!isVerified) {
      throw new UnauthorizedException('User account is not verified');
    }
    const email = profile?.emails?.at(0)?.value;
    if (!email) {
      throw new UnauthorizedException('Email not found in Google profile');
    }
    const user =
      (await this.userRepository.findOne({ where: { email: email } })) ??
      (await this.createUserViaGoogle(email));

    if (!user) {
      throw new UnauthorizedException('Invalid google email account');
    }
    return UserMapper.toIUserData(user, 'deviceId'); // todo. hardcore
  }

  private async createUserViaGoogle(email: string): Promise<UserEntity> {
    const quantityPersons = await this.userRepository.findAndCount();
    return await this.userRepository.save(
      this.userRepository.create({
        phoneNumber: null,
        email,
        role:
          quantityPersons[1] === 0
            ? UserEnum.ADMIN
            : UserEnum.OAUTHREGISTERED_CLIENT,
      }),
    );
  }
}
