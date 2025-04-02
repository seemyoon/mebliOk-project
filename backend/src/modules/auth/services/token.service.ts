import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import {
  ActionTokenConfig,
  Config,
  JwtConfig,
} from '../../../configs/config.type';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ITokenPair } from '../interfaces/token-pair.interface';
import { TokenType } from '../models/enums/token-type.enum';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfig;
  private readonly actionTokenConfig: ActionTokenConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = configService.get<JwtConfig>('jwt');
    this.actionTokenConfig =
      configService.get<ActionTokenConfig>('actionToken');
  }

  public async generateActionTokens(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.actionTokenConfig.actionTokenSecret,
      expiresIn: this.actionTokenConfig.actionTokenExpireIn,
    });
  }

  public async generateTokens(payload: JwtPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpireIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpireIn,
    });
    return { accessToken, refreshToken };
  }

  public async validate(token: string, type: TokenType): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.getSecret(type),
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  public getSecret(type: TokenType): string {
    let secret: string;
    switch (type) {
      case TokenType.ACCESS:
        secret = this.jwtConfig.accessSecret;
        break;
      case TokenType.REFRESH:
        secret = this.jwtConfig.refreshSecret;
        break;
      default:
        throw new Error('Unknown token type');
    }
    return secret;
  }
}
