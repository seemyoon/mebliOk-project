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

import { BrandID } from '../../../common/types/entity-ids.type';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { BrandReqDto } from '../dto/req/brand.req.dto';
import { ListBrandsQueryDto } from '../dto/req/list-brands.query.dto';
import { UpdateBrandReqDto } from '../dto/req/update-brand.req.dto';
import { BrandResDto } from '../dto/res/brand.res.dto';
import { BrandsListResDto } from '../dto/res/brands-list.res.dto';
import { BrandMapper } from '../services/brand.mapper';
import { BrandService } from '../services/brand.service';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @SkipAuth()
  @Get('getBrands')
  public async getBrands(
    @Query() query: ListBrandsQueryDto,
  ): Promise<BrandsListResDto> {
    const [entities, total] = await this.brandService.getBrands(query);
    return BrandMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Post('createBrand')
  public async createBrand(@Body() dto: BrandReqDto): Promise<BrandResDto> {
    return BrandMapper.toResDto(await this.brandService.createBrand(dto));
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Patch(':brandId')
  public async editBrand(
    @Param('brandId', ParseUUIDPipe) brandId: BrandID,
    @Body() dto: UpdateBrandReqDto,
  ): Promise<BrandResDto> {
    return BrandMapper.toResDto(
      await this.brandService.editBrand(dto, brandId),
    );
  }

  @SkipAuth()
  @Get(':brandId')
  public async getBrand(
    @Param('brandId', ParseUUIDPipe) brandId: BrandID,
  ): Promise<BrandResDto> {
    return BrandMapper.toResDto(await this.brandService.getBrand(brandId));
  }
}
