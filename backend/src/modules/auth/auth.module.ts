import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { RedisModule } from '../../infrastructure/redis/redis.module';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtAccessGuard } from './guards/jwt.access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { ActionTokenStrategy } from './strategies/action-token.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { ActionTokenGuard } from './guards/action-token.guard';

const AppGuardProvider = {
  provide: APP_GUARD,
  useClass: JwtAccessGuard,
};

const strategies = [
  GoogleStrategy,
  JwtAccessStrategy,
  JwtRefreshStrategy,
  ActionTokenStrategy,
];

@Module({
  imports: [RedisModule, UserModule, JwtModule, PassportModule, MailModule],
  controllers: [AuthController],
  providers: [
    AppGuardProvider,
    AuthService,
    AuthCacheService,
    TokenService,
    JwtRefreshGuard,
    ActionTokenGuard,
    PasswordService,
    ...strategies,
  ],
  exports: [PassportModule, AuthCacheService],
})
export class AuthModule {}
