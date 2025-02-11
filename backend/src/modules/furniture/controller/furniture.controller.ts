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
import { FurnitureID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { CreateFurnitureReqDto } from '../dto/req/create-furniture.req.dto';
import { ListFurnitureQueryDto } from '../dto/req/list-furniture-query.dto';
import { UpdateFurnitureReqDto } from '../dto/req/update-furniture.req.dto';
import { FurnitureBaseResDto } from '../dto/res/base-furniture.res.dto';
import { FurnitureListResDto } from '../dto/res/furniture-list.res.dto';
import { FurnitureMapper } from '../service/furniture.mapper';
import { FurnitureService } from '../service/furniture.service';

@ApiTags('Furniture')
@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @SkipAuth()
  @Get('getAllFurniture')
  public async getAllFurniture(
    @Query() query: ListFurnitureQueryDto,
  ): Promise<FurnitureListResDto> {
    const [entities, total] =
      await this.furnitureService.getAllFurniture(query);
    return FurnitureMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Post('createFurniture')
  public async createFurniture(
    @Body() dto: CreateFurnitureReqDto,
  ): Promise<FurnitureBaseResDto> {
    const furniture = await this.furnitureService.createFurniture(dto);
    return FurnitureMapper.toResDto(furniture);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Post('addBrand')
  public async addBrand(
    @Body() dto: CreateFurnitureReqDto,
  ): Promise<FurnitureBaseResDto> {
    const furniture = await this.furnitureService.createFurniture(dto);
    return FurnitureMapper.toResDto(furniture);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Patch(':furnitureId/activeDiscount')
  public async activeDiscount(
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
  ): Promise<void> {
    await this.furnitureService.activeDiscount(furnitureId);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiFile('image', false, true)
  @Post('/uploadPhotos/:furnitureId')
  public async uploadFurnitureImage(
    @Param('furnitureId') furnitureId: FurnitureID,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.furnitureService.uploadFurnitureImage(furnitureId, file);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Patch(':furnitureId')
  public async editFurniture(
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
    @Body() dto: UpdateFurnitureReqDto,
  ): Promise<void> {
    return await this.furnitureService.editFurniture(furnitureId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Delete(':furnitureId')
  public async deleteFurniture(
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
  ): Promise<void> {
    return await this.furnitureService.deleteFurniture(furnitureId);
  }

  @SkipAuth()
  @Get(':furnitureId')
  public async getFurniture(
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
  ): Promise<FurnitureBaseResDto> {
    return FurnitureMapper.toResDto(
      await this.furnitureService.getFurniture(furnitureId),
    );
  }
}
