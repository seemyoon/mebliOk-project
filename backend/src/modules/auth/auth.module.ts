import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { RedisModule } from '../../infrastructure/redis/redis.module';
import { AuthController } from './controllers/auth.controller';
import { JwtAccessGuard } from './guards/jwt.access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AccessTokenService } from './services/access-token.service';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [RedisModule, JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    JwtRefreshGuard,
    AuthService,
    GoogleStrategy,
    AccessTokenService,
    TokenService,
    PasswordService,
  ],
  exports: [],
})
export class AuthModule {}
