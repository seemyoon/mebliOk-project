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

const AppGuardProvider = {
  provide: APP_GUARD,
  useClass: JwtAccessGuard,
};

const strategies = [GoogleStrategy, JwtAccessStrategy, JwtRefreshStrategy];

@Module({
  imports: [
    RedisModule,
    JwtModule,
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    JwtRefreshGuard,
    PasswordService,
    AccessTokenService,
    AppGuardProvider,
    ...strategies,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
