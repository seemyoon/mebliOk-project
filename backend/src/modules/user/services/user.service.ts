import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/users.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { PasswordService } from '../../auth/services/password.service';
import { FileTypeEnum } from '../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserEnum } from '../enum/users.enum';
import { CreateUserReqUserDto } from '../models/req/create-user.req.dto.';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { UpdateReqUserDto } from '../models/req/update-req-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly passwordService: PasswordService,
    private readonly fileStorageService: FileStorageService,
  ) {}

  public async getMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findUser(userData.userId);
  }

  public async uploadAvatar(
    userData: IUserData,
    file: Express.Multer.File,
  ): Promise<void> {
    const user = await this.userRepository.findUser(userData.userId);
    if (!user) {
      throw new ConflictException('User not found');
    }
    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      userData.userId,
    );
    await this.userRepository.save({ ...user, image: filePath });
  }

  public async editMe(
    userData: IUserData,
    dto: UpdateReqUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
    if (dto?.name) {
      user.name = dto.name;
    }

    await this.userRepository.save(user);
    return user;
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
    await this.isEmailAndNumberNotExistOrThrow(dto.email, dto.phoneNumber);

    const password = await this.passwordService.hashPassword(dto.password, 10);
    const user = this.userRepository.create({ ...dto, password });

    return await this.userRepository.save(user);
  }

  public async getUser(userId: UserID): Promise<UserEntity> {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new ConflictException('User not found');
    }
    return user;
  }

  private async isEmailAndNumberNotExistOrThrow(
    email: string,
    phoneNumber: string,
  ): Promise<void> {
    const userEmail = await this.userRepository.findOneBy({ email });
    if (userEmail) {
      throw new BadRequestException('Email already exists');
    }
    const userPhoneNumber = await this.userRepository.findOneBy({
      phoneNumber,
    });
    if (userPhoneNumber) {
      throw new BadRequestException('PhoneNumber already exists');
    }
  }
}
