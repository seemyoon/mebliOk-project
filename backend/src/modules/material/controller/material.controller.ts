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

import { MaterialID } from '../../../common/types/entity-ids.type';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { ListMaterialsQueryDto } from '../dto/req/list-materials.query.dto';
import { MaterialReqDto } from '../dto/req/material.req.dto';
import { UpdateMaterialReqDto } from '../dto/req/update-material.req.dto';
import { MaterialResDto } from '../dto/res/material.res.dto';
import { MaterialsListResDto } from '../dto/res/materials-list.res.dto';
import { MaterialFurnitureMapper } from '../services/material.mapper';
import { MaterialService } from '../services/material.service';

@ApiTags('Material')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @SkipAuth()
  @Get('getMaterials')
  public async getMaterials(
    @Query() query: ListMaterialsQueryDto,
  ): Promise<MaterialsListResDto> {
    const [entities, total] = await this.materialService.getMaterials(query);
    return MaterialFurnitureMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiBearerAuth()
  @Post('createMaterial')
  public async createMaterial(
    @Body() dto: MaterialReqDto,
  ): Promise<MaterialResDto> {
    return MaterialFurnitureMapper.toResDto(
      await this.materialService.createMaterial(dto),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiBearerAuth()
  @Patch(':materialId')
  public async editMaterial(
    @Param('materialId', ParseUUIDPipe) materialId: MaterialID,
    @Body() dto: UpdateMaterialReqDto,
  ): Promise<MaterialResDto> {
    return MaterialFurnitureMapper.toResDto(
      await this.materialService.editMaterial(dto, materialId),
    );
  }

  @SkipAuth()
  @Get(':materialId')
  public async getMaterial(
    @Param('materialId', ParseUUIDPipe) materialId: MaterialID,
  ): Promise<MaterialResDto> {
    return MaterialFurnitureMapper.toResDto(
      await this.materialService.getMaterial(materialId),
    );
  }
}
