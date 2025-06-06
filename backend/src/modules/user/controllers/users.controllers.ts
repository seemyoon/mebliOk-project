import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../../common/decorators/api-file.decorator';
import { UserID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ROLES } from '../decorators/roles.decorator';
import { UserEnum } from '../enum/users.enum';
import { RolesGuard } from '../guard/roles.guard';
import { ChangeRoleReqDto } from '../models/req/change-role.req.dto';
import { CreateUserReqUserDto } from '../models/req/create-user.req.dto.';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { UpdateMeReqUserDto } from '../models/req/update-me-req-user.dto';
import { UserResDto } from '../models/res/user.res.dto';
import { UsersListResDto } from '../models/res/users-list.res.dto';
import { UserMapper } from '../services/user.mapper';
import { UserService } from '../services/user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.MANAGER, UserEnum.ADMIN, UserEnum.REGISTERED_CLIENT)
  @Get('getMe')
  public async getMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.getMe(userData));
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.MANAGER, UserEnum.ADMIN, UserEnum.REGISTERED_CLIENT)
  @Delete('deleteMe')
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.deleteMe(userData);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.MANAGER, UserEnum.ADMIN, UserEnum.REGISTERED_CLIENT)
  @Patch('editMe')
  public async editMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateMeReqUserDto,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.editMe(userData, dto));
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Get('getUsers')
  public async getUsers(
    @Query() query: ListUsersQueryDto,
  ): Promise<UsersListResDto> {
    const [entities, total] = await this.userService.getUsers(query);
    return UserMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Post('createUser')
  public async createUser(
    @Body() dto: CreateUserReqUserDto,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.createUser(dto));
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.MANAGER, UserEnum.ADMIN, UserEnum.REGISTERED_CLIENT)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar', false, true)
  @Post('/uploadAvatar')
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    return await this.userService.uploadAvatar(userData, file);
  }

  @ApiBearerAuth()
  @UseGuards()
  @ROLES(UserEnum.ADMIN)
  @Get('changeRole')
  public async changeRole(
    @Param('userId', ParseUUIDPipe) userId: UserID,
    @Body() dto: ChangeRoleReqDto,
  ) {
    return UserMapper.toResDto(await this.userService.changeRole(userId, dto));
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Get(':userId')
  public async getUser(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.getUser(userId));
  }
}
