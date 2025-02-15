import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  CategoryFurnitureID,
  SubCategoryFurnitureID,
} from '../../../common/types/entity-ids.type';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { CategoryReqDto } from '../dto/req/category.req.dto';
import { ListCategoriesFurnitureQueryDto } from '../dto/req/list-categories-furniture.query.dto';
import { ListSubCategoriesFurnitureQueryDto } from '../dto/req/list-subcategories-furniture.query.dto';
import { SubCategoryReqDto } from '../dto/req/subcategory.req.dto';
import { UpdateCategoryFurnitureReqDto } from '../dto/req/update-category.req.dto';
import { UpdateSubCategoryFurnitureReqDto } from '../dto/req/update-subcategory.req.dto';
import { CategoriesFurnitureListResDto } from '../dto/res/categories-list.res.dto';
import { CategoryFurnitureResDto } from '../dto/res/category-furniture.res.dto';
import { SubCategoriesFurnitureListResDto } from '../dto/res/subcategories-list.res.dto';
import { SubCategoryFurnitureResDto } from '../dto/res/subcategory-furniture.res.dto';
import { CategoriesService } from '../services/categories.service';
import { CategoriesMapper } from '../services/categories-mapper.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @SkipAuth()
  @Get('getCategoriesFurniture')
  public async getCategoriesFurniture(
    @Query() query: ListCategoriesFurnitureQueryDto,
  ): Promise<CategoriesFurnitureListResDto> {
    const [entities, total] =
      await this.categoriesService.getCategoriesFurniture(query);
    return CategoriesMapper.toResCategoryFurnitureList(entities, total, query);
  }

  @SkipAuth()
  @Get('getSubCategoriesFurniture')
  public async getSubCategoriesFurniture(
    @Param('categoryFurnitureID', ParseUUIDPipe)
    categoryFurnitureID: CategoryFurnitureID,
    @Query() query: ListSubCategoriesFurnitureQueryDto,
  ): Promise<SubCategoriesFurnitureListResDto> {
    const [entities, total] =
      await this.categoriesService.getSubCategoriesFurniture(
        query,
        categoryFurnitureID,
      );
    return CategoriesMapper.toResSubCategoryFurnitureList(
      entities,
      total,
      query,
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Post('createCategoryFurniture')
  public async createCategoryFurniture(
    @Body() dto: CategoryReqDto,
  ): Promise<CategoryFurnitureResDto> {
    return CategoriesMapper.toResCategoryFurnitureDto(
      await this.categoriesService.createCategoryFurniture(dto),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Post(':subCategoryFurnitureID')
  public async createSubCategoryFurniture(
    @Param('categoryFurnitureID', ParseUUIDPipe)
    categoryFurnitureID: CategoryFurnitureID,
    @Body() dto: SubCategoryReqDto,
  ): Promise<SubCategoryFurnitureResDto> {
    return CategoriesMapper.toResSubCategoryFurnitureDto(
      await this.categoriesService.createSubCategoryFurniture(
        dto,
        categoryFurnitureID,
      ),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Patch(':categoryFurnitureID')
  public async editCategoryFurniture(
    @Param('categoryFurnitureID', ParseUUIDPipe)
    categoryFurnitureID: CategoryFurnitureID,
    @Body() dto: UpdateCategoryFurnitureReqDto,
  ): Promise<CategoryFurnitureResDto> {
    return CategoriesMapper.toResCategoryFurnitureDto(
      await this.categoriesService.editCategoryFurniture(
        dto,
        categoryFurnitureID,
      ),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Patch(':subCategoryFurnitureID')
  public async editSubCategoryFurniture(
    @Param()
    params: {
      categoryFurnitureID?: CategoryFurnitureID;
      subCategoryFurnitureID?: SubCategoryFurnitureID;
    },
    @Body() dto: UpdateSubCategoryFurnitureReqDto,
  ): Promise<SubCategoryFurnitureResDto> {
    const { categoryFurnitureID, subCategoryFurnitureID } = params;
    return CategoriesMapper.toResSubCategoryFurnitureDto(
      await this.categoriesService.editSubCategoryFurniture(
        dto,
        subCategoryFurnitureID,
        categoryFurnitureID,
      ),
    );
  }

  @SkipAuth()
  @Get(':categoryFurnitureID')
  public async getCategoryFurniture(
    @Param('categoryFurnitureID', ParseUUIDPipe)
    categoryFurnitureID: CategoryFurnitureID,
  ): Promise<CategoryFurnitureResDto> {
    return CategoriesMapper.toResCategoryFurnitureDto(
      await this.categoriesService.getCategoryFurniture(categoryFurnitureID),
    );
  }

  @SkipAuth()
  @Get(':subCategoryFurnitureID')
  public async getSubCategoryFurniture(
    @Param('subCategoryFurnitureID', ParseUUIDPipe)
    subCategoryFurnitureID: SubCategoryFurnitureID,
  ): Promise<SubCategoryFurnitureResDto> {
    return CategoriesMapper.toResSubCategoryFurnitureDto(
      await this.categoriesService.getSubCategoryFurniture(
        subCategoryFurnitureID,
      ),
    );
  }
}
