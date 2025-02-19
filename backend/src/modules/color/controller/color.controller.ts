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

import { ColorID } from '../../../common/types/entity-ids.type';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { ColorReqDto } from '../dto/req/color.req.dto';
import { ListColorsQueryDto } from '../dto/req/list-colors.query.dto';
import { UpdateColorReqDto } from '../dto/req/update-color.req.dto';
import { ColorResDto } from '../dto/res/color.res.dto';
import { ColorsListResDto } from '../dto/res/colors-list.res.dto';
import { ColorFurnitureMapper } from '../services/color.mapper';
import { ColorService } from '../services/color.service';

@ApiTags('Color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @SkipAuth()
  @Get('getColors')
  public async getColors(
    @Query() query: ListColorsQueryDto,
  ): Promise<ColorsListResDto> {
    const [entities, total] = await this.colorService.getColors(query);
    return ColorFurnitureMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiBearerAuth()
  @Post('createColor')
  public async createColor(@Body() dto: ColorReqDto): Promise<ColorResDto> {
    return ColorFurnitureMapper.toResDto(
      await this.colorService.createColor(dto),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiBearerAuth()
  @Patch(':colorId')
  public async editColor(
    @Param('colorId', ParseUUIDPipe) colorId: ColorID,
    @Body() dto: UpdateColorReqDto,
  ): Promise<ColorResDto> {
    return ColorFurnitureMapper.toResDto(
      await this.colorService.editColor(dto, colorId),
    );
  }

  @SkipAuth()
  @Get(':colorId')
  public async getColor(
    @Param('colorId', ParseUUIDPipe) colorId: ColorID,
  ): Promise<ColorResDto> {
    return ColorFurnitureMapper.toResDto(
      await this.colorService.getColor(colorId),
    );
  }
}
