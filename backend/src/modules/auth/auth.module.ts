import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { RedisModule } from '../../infrastructure/redis/redis.module';
import { MailModule } from '../mail/mail.module';
import { AuthController } from './controllers/auth.controller';
import { JwtAccessGuard } from './guards/jwt.access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AccessTokenService } from './services/access-token.service';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UserModule } from '../user/user.module';

const AppGuardProvider = {
  provide: APP_GUARD,
  useClass: JwtAccessGuard,
};

const strategies = [GoogleStrategy, JwtAccessStrategy, JwtRefreshStrategy];

@Module({
  imports: [RedisModule, UserModule, JwtModule, PassportModule, MailModule],
  controllers: [AuthController],
  providers: [
    AppGuardProvider,
    AuthService,
    AccessTokenService,
    TokenService,
    JwtRefreshGuard,
    PasswordService,
    ...strategies,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
