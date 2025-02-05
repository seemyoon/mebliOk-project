import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserEntity } from '../../../database/entities/users.entity';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserEnum } from '../../user/enum/users.enum';
import { UserMapper } from '../../user/services/user.mapper';
import { ITokenPair } from '../interfaces/token-pair.interface';
import { IUserData } from '../interfaces/user-data.interface';
import { GoogleSignUpReqDto } from '../models/dto/req/google-sign-up.req.dto';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { AccessTokenService } from './access-token.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { UserID } from '../../../common/types/entity-ids.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AccessTokenService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);
    const password = await this.passwordService.hashPassword(dto.password, 10);
    const quantityPersons = await this.userRepository.findAndCount();
    const user = await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        role:
          quantityPersons[1] === 0
            ? UserEnum.ADMIN
            : UserEnum.REGISTERED_CLIENT,
      }),
    );

    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
    });

    await Promise.all([
      this.authCacheService.saveToken(tokens.accessToken, user.id),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    return { user: UserMapper.toResDto(user), tokens };
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password', 'deleted'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.deleted) {
      await this.userRepository.update({ id: user.id }, { deleted: null });
    }
    const isPasswordValid = await this.passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
    });

    await Promise.all([
      this.authCacheService.saveToken(tokens.accessToken, user.id),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    const userEntity = await this.userRepository.findOneBy({ id: user.id });

    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  public async loginWithGoogle(userId: UserID): Promise<TokenPairResDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return await this.createTokens(user);
  }

  public async logOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
      }),
    ]);
  }

  public async refreshToken(userData: IUserData): Promise<TokenPairResDto> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
      }),
    ]);
    const tokens = await this.tokenService.generateTokens({
      userId: userData.userId,
    });
    await Promise.all([
      this.authCacheService.saveToken(tokens.accessToken, userData.userId),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: userData.userId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    return tokens;
  }

  public async validateGoogleUser(
    dto: GoogleSignUpReqDto,
  ): Promise<AuthResDto> {
    let user = await this.userRepository.findByEmail(dto.email);

    user = user ?? (await this.createUser(dto));

    const tokens = await this.createTokens(user);

    await Promise.all([
      this.authCacheService.saveToken(tokens.accessToken, user.id),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    return { user: UserMapper.toResDto(user), tokens };
  }

  private async createTokens(user: UserEntity): Promise<ITokenPair> {
    return await this.tokenService.generateTokens({
      userId: user.id,
    });
  }

  private async createUser(dto: SignUpReqDto): Promise<UserEntity> {
    const password = await this.passwordService.hashPassword(dto.password, 10);
    const quantityPersons = await this.userRepository.findAndCount();
    return await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        role:
          quantityPersons[1] === 0
            ? UserEnum.ADMIN
            : UserEnum.REGISTERED_CLIENT,
      }),
    );
  }

  private async isEmailNotExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('Email already exists');
    }
  }
}
