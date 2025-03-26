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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ApiFile } from '../../../common/decorators/api-file.decorator';
import {
  BrandID,
  CategoryFurnitureID,
  ColorID,
  FavouriteFurnitureID,
  FurnitureID,
  MaterialID,
  SubCategoryFurnitureID,
} from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { AssignDiscountReqDto } from '../dto/req/assign-discount.req.dto';
import { CreateFurnitureReqDto } from '../dto/req/create-furniture.req.dto';
import { ListFavouriteFurnitureQueryDto } from '../dto/req/list-favourite-furniture-query.dto';
import { ListFurnitureQueryDto } from '../dto/req/list-furniture-query.dto';
import { UpdateFurnitureReqDto } from '../dto/req/update-furniture.req.dto';
import { FurnitureBaseResDto } from '../dto/res/base-furniture.res.dto';
import { FurnitureFavouriteResDto } from '../dto/res/furniture-favourite.res.dto';
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
  @ROLES(UserEnum.MANAGER, UserEnum.ADMIN, UserEnum.REGISTERED_CLIENT)
  @Get('getAllFavouriteFurniture')
  public async getAllFavouriteFurniture(
    @Query() query: ListFavouriteFurnitureQueryDto,
    @CurrentUser() userData: IUserData,
  ) {
    const [entities, total] =
      await this.furnitureService.getAllFavouriteFurniture(query, userData);
    return FurnitureMapper.toResFavouriteFurnitureDtoList(
      entities,
      total,
      query,
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.MANAGER, UserEnum.ADMIN, UserEnum.REGISTERED_CLIENT)
  @Post('addFavouriteFurniture')
  public async FavouriteFurniture(
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
  ): Promise<FurnitureFavouriteResDto> {
    return FurnitureMapper.toResOneFavouriteFurnitureDto(
      await this.furnitureService.addFavouriteFurniture(furnitureId),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiOperation({
    summary: 'We can see it exactly in FE',
  })
  @Patch('/pickShowPriceForFurnitureOrNot')
  public async pickShowPriceForAllFurnitureOrNot(): Promise<void> {
    await this.furnitureService.pickShowPriceForAllFurnitureOrNot();
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Post(
    'createFurniture/:categoryFurnitureID/:subCategoryFurnitureID/:brandID/:materialID/:colorID',
  )
  public async createFurniture(
    @Body() dto: CreateFurnitureReqDto,
    @Param('categoryFurnitureID', ParseUUIDPipe)
    categoryFurnitureID: CategoryFurnitureID,
    @Param('subCategoryFurnitureID', ParseUUIDPipe)
    subCategoryFurnitureID: SubCategoryFurnitureID,
    @Param('brandID', ParseUUIDPipe)
    brandID: BrandID,
    @Param('materialID') materialID: MaterialID,
    @Param('colorID') colorID: ColorID,
  ): Promise<FurnitureBaseResDto> {
    const materialIDArray = materialID
      .split(',')
      .map((id) => id.trim() as MaterialID);

    const colorIDArray = colorID.split(',').map((id) => id.trim() as ColorID);

    const furniture = await this.furnitureService.createFurniture(
      dto,
      categoryFurnitureID,
      subCategoryFurnitureID,
      brandID,
      colorIDArray,
      materialIDArray,
    );
    return FurnitureMapper.toResDto(furniture);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Patch(
    'updateFurniture/:furnitureId/:categoryFurnitureID/:subCategoryFurnitureID/:brandID/:materialID/:colorID',
  )
  public async editFurniture(
    @Body() dto: UpdateFurnitureReqDto,
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
    @Param('categoryFurnitureID', ParseUUIDPipe)
    categoryFurnitureID: CategoryFurnitureID,
    @Param('subCategoryFurnitureID', ParseUUIDPipe)
    subCategoryFurnitureID: SubCategoryFurnitureID,
    @Param('brandID', ParseUUIDPipe)
    brandID: BrandID,
    @Param('materialID') materialID: MaterialID,
    @Param('colorID') colorID: ColorID,
  ): Promise<void> {
    const materialIDArray = materialID
      .split(',')
      .map((id) => id.trim() as MaterialID);

    const colorIDArray = colorID.split(',').map((id) => id.trim() as ColorID);

    return await this.furnitureService.editFurniture(
      dto,
      furnitureId,
      categoryFurnitureID,
      subCategoryFurnitureID,
      brandID,
      colorIDArray,
      materialIDArray,
    );
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
  @Patch(':furnitureId/activeStock')
  public async activeStock(
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
  ): Promise<void> {
    await this.furnitureService.activeStock(furnitureId);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Patch(':furnitureId/activeSale')
  public async activeSale(
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
  ): Promise<void> {
    await this.furnitureService.activeSale(furnitureId);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Patch(':furnitureId/assignDiscount')
  public async assignDiscount(
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
    @Body() dto: AssignDiscountReqDto,
  ): Promise<void> {
    await this.furnitureService.assignDiscount(furnitureId, dto);
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

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.REGISTERED_CLIENT, UserEnum.ADMIN, UserEnum.MANAGER)
  @Delete(':favouriteFurnitureId')
  public async deleteFavouriteFurniture(
    @Param('favouriteFurnitureId', ParseUUIDPipe)
    favouriteFurnitureId: FavouriteFurnitureID,
  ): Promise<void> {
    return await this.furnitureService.deleteFavoriteFurniture(
      favouriteFurnitureId,
    );
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

  @SkipAuth()
  @Get(':favFurnitureId') // todo. check endpoint favFurniture
  public async getFavouriteFurniture(
    @Param('favFurnitureId', ParseUUIDPipe)
    favFurnitureId: FavouriteFurnitureID,
  ): Promise<FurnitureFavouriteResDto> {
    return FurnitureMapper.toResOneFavouriteFurnitureDto(
      await this.furnitureService.getFavouriteFurniture(favFurnitureId),
    );
  }
}
