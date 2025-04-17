import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { UserID } from '../../../common/types/entity-ids.type';
import { Config, MailConfig } from '../../../configs/config.type';
import { UserEntity } from '../../../infrastructure/postgres/entities/users.entity';
import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { EmailTypeEnum } from '../../mail/enum/email.enum';
import { MailService } from '../../mail/service/mail.service';
import { UserEnum } from '../../user/enum/users.enum';
import { UserMapper } from '../../user/services/user.mapper';
import { ITokenPair } from '../interfaces/token-pair.interface';
import { IUserData } from '../interfaces/user-data.interface';
import { ChangePasswordReqDto } from '../models/dto/req/change-password.req.dto';
import { ResetPasswordChangeReqDto } from '../models/dto/req/reset-password-change.req.dto';
import { ResetPasswordSendReqDto } from '../models/dto/req/reset-password-send.req.dto';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private readonly mailConfig: MailConfig;

  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.mailConfig = configService.get<MailConfig>('mail');
  }

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    let user: UserEntity | null = null;

    const userEmail = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (userEmail) {
      throw new BadRequestException(
        'User with this email or phone number already exists',
      );
    }
    if (dto.phoneNumber) {
      user = await this.userRepository.findOneBy({
        phoneNumber: dto.phoneNumber,
      });
    }

    if (user) {
      if (user.role === UserEnum.UNREGISTERED_CLIENT) {
        user.password = await this.passwordService.hashPassword(
          dto.password,
          10,
        );
        user.role = UserEnum.REGISTERED_CLIENT;
        user.name = dto.name ?? user.name;
        user.email = dto.email ?? user.email;
        user.phoneNumber = dto.phoneNumber ?? user.phoneNumber;
        await this.userRepository.save(user);
      } else {
        throw new BadRequestException(
          'User with this email or phone number already exists',
        );
      }
    } else {
      const quantityPersons = await this.userRepository.count();
      user = this.userRepository.create({
        ...dto,
        password: await this.passwordService.hashPassword(dto.password, 10),
        role:
          quantityPersons === 0 ? UserEnum.ADMIN : UserEnum.REGISTERED_CLIENT,
      });
      await this.userRepository.save(user);
    }

    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await this.userRepository.save(user);

    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    // const actionToken = await this.tokenService.generateActionTokens(
    //   {
    //     userId: user.id,
    //     deviceId: dto.deviceId,
    //   },
    // );
    //
    // await this.mailService.sendEmail(
    //   this.mailConfig.email, // todo user email (temporary)
    //   EmailTypeEnum.WELCOME,
    //   { name: user.name, actionToken },
    // );

    return { user: UserMapper.toResDto(user), tokens };
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    // todo signIn by phone-number or email
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password', 'deleted'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
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
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    const userEntity = await this.userRepository.findOneBy({ id: user.id });

    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  public async logOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceID),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceID,
      }),
    ]);
  }

  public async refreshToken(userData: IUserData): Promise<TokenPairResDto> {
    if (!userData) throw new NotFoundException('user not found');

    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceID),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceID,
      }),
    ]);
    const tokens = await this.tokenService.generateTokens({
      userId: userData.userId,
      deviceId: userData.deviceID,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        userData.userId,
        userData.deviceID,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: userData.userId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    return tokens;
  }

  public async createGoogleUser(email: string): Promise<UserEntity> {
    let user = await this.userRepository.findOne({
      where: { email: email },
    });

    user = user ?? (await this.createUserViaGoogle(email));

    return user;
  }

  public async changePassword(
    userData: IUserData,
    dto: ChangePasswordReqDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
      select: ['id', 'password'],
    });

    await this.checkOldPassword(dto.oldPassword, user.password);

    const isPrevious = await this.passwordService.comparePassword(
      dto.password,
      user.password,
    ); // todo ability checking for latest passwords with crons

    if (isPrevious)
      throw new UnauthorizedException(
        'You can not specify your latest password',
      );

    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
      10,
    );

    await this.returnChangedPasswordOrThrow(user.id, hashedPassword);

    await this.logOut(userData);

    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
      deviceId: userData.deviceID,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        userData.deviceID,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: userData.deviceID,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
  }

  public async forgotPasswordSendEmail(
    dto: ResetPasswordSendReqDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('User not found');

    const token = await this.tokenService.generateActionToken({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    await this.authCacheService.saveActionToken(token, user.id, dto.deviceId);

    await this.mailService.sendEmail(
      user.email,
      EmailTypeEnum.FORGOT_PASSWORD,
      {
        name: user.name,
        email: user.email,
        actionToken: token,
      },
    );
  }

  public async forgotPasswordChange(
    dto: ResetPasswordChangeReqDto,
    userData: IUserData,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
      select: ['id', 'password'],
    });

    if (!user) throw new NotFoundException('User not found');

    const isPrevious = await this.passwordService.comparePassword(
      dto.password,
      user.password,
    );

    if (isPrevious) throw new ConflictException('Password already used');

    const password = await this.passwordService.hashPassword(dto.password, 10);

    await this.userRepository.save({ ...user, password });

    await this.logOut(userData);
  }

  public async googleCallback(request: Request): Promise<void> {
    const deviceId = request.query.deviceId as string;
    if (!deviceId) throw new BadRequestException('Device Id is required');

    await this.signInViaGoogle(request.user as UserEntity); // todo. avoid it. when do frontend
    // const { accessToken, refreshToken } = await this.signInViaGoogle(request);
  }

  private async returnChangedPasswordOrThrow(
    userId: UserID,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findUser(userId);
    if (!user) throw new NotFoundException('user not found');
    if (password) user.password = password;

    await this.userRepository.save(user);
    return user;
  }

  private async checkOldPassword(
    oldPasswordDto: string,
    passwordDB: string,
  ): Promise<void> {
    const isPasswordValid = await this.passwordService.comparePassword(
      oldPasswordDto,
      passwordDB,
    );
    if (!isPasswordValid) throw new ConflictException('Password is incorrect');
  }

  private async signInViaGoogle(user: UserEntity): Promise<ITokenPair> {
    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
      deviceId: 'asd', // todo. hardcore
    });

    await Promise.all([
      this.authCacheService.saveToken(tokens.accessToken, user.id, 'asd'), // todo. hardcore
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          refreshToken: tokens.refreshToken,
          deviceId: 'asd', // todo. hardcore
        }),
      ),
    ]);

    return tokens;
  }

  private async createUserViaGoogle(email: string): Promise<UserEntity> {
    const quantityPersons = await this.userRepository.findAndCount();
    return await this.userRepository.save(
      this.userRepository.create({
        email,
        role:
          quantityPersons[1] === 0
            ? UserEnum.ADMIN
            : UserEnum.REGISTERED_CLIENT,
      }),
    );
  }
}
