import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { PasswordService } from '../../auth/services/password.service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserEnum } from '../enum/users.enum';
import { CreateUserReqUserDto } from '../models/req/create-user.req.dto.';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async getMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findUser(userData.userId);
  }

  public async getUsers(
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.findAll(query);
  }

  public async deleteMe(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findUser(userData.userId);

    if ([UserEnum.ADMIN].includes(user.role)) {
      throw new ConflictException('You can not delete yourself');
    }

    await this.userRepository.update(
      { id: userData.userId },
      { deleted: new Date() },
    );
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
  }

  public async createUser(dto: CreateUserReqUserDto): Promise<UserEntity> {
    await this.isEmailNotExistOrThrow(dto.email);
    const password = await this.passwordService.hashPassword(dto.password, 10);
    await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );

    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password'],
    });

    await this.userRepository.save(user);
    return user;
  }

  public async getUser(userId: UserID): Promise<UserEntity> {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new ConflictException('User not found');
    }
    return user;
  }

  private async isEmailNotExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('Email already exists');
    }
  }
}
