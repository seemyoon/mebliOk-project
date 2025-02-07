import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ROLES } from '../decorators/roles.decorator';
import { UserEnum } from '../enum/users.enum';
import { RolesGuard } from '../guard/roles.guard';
import { CreateUserReqUserDto } from '../models/req/create-user.req.dto.';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { UserResDto } from '../models/res/user.res.dto';
import { UsersListResDto } from '../models/res/users-list.res.dto';
import { UserMapper } from '../services/user.mapper';
import { UserService } from '../services/user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getMe')
  public async getMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.getMe(userData));
  }

  @Delete('deleteMe')
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.deleteMe(userData);
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Get('getUsers')
  public async getUsers(
    @Query() query: ListUsersQueryDto,
  ): Promise<UsersListResDto> {
    const [entities, total] = await this.userService.getUsers(query);
    return UserMapper.toResDtoList(entities, total, query);
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Post('createUser')
  public async createUser(
    @Body() dto: CreateUserReqUserDto,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.createUser(dto));
  }

  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Get(':userId')
  public async getUser(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.getUser(userId));
  }
}
