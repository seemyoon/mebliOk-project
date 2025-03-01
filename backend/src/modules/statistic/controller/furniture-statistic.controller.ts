import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FurnitureID } from '../../../common/types/entity-ids.type';
import { CalculateRateFurnitureEntity } from '../../../database/entities/calculate-rate-furniture.entity';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { UpdateCalculateFurnitureRateReqDto } from '../dto/req/update-calculate-furniture-rate.req.dto';
import { FurnitureStatisticBaseResDto } from '../dto/res/furniture-statistic-base.res.dto';
import { FurnitureStatisticMapper } from '../services/furniture-statistic.mapper';
import { FurnitureStatisticService } from '../services/furniture-statistic.service';

@ApiTags('FurnitureStatistic')
@Controller('furnitureStatistic')
export class FurnitureStatisticController {
  constructor(
    private readonly furnitureStatisticService: FurnitureStatisticService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiBearerAuth()
  @Patch('/editCalculateFurnitureRate')
  public async editCalculateFurnitureRate(
    @Body() dto: UpdateCalculateFurnitureRateReqDto,
  ): Promise<CalculateRateFurnitureEntity> {
    return FurnitureStatisticMapper.toResCalculateFurnitureRateDto(
      await this.furnitureStatisticService.editCalculateFurnitureRate(dto),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiBearerAuth()
  @Get('/getCalculateFurnitureRate')
  public async getCalculateFurnitureRate(): Promise<CalculateRateFurnitureEntity> {
    return FurnitureStatisticMapper.toResCalculateFurnitureRateDto(
      await this.furnitureStatisticService.getCalculateFurnitureRate(),
    );
  }

  @SkipAuth()
  @Get(':furnitureId')
  public async getFurnitureStatistic(
    @Param('furnitureId', ParseUUIDPipe) furnitureId: FurnitureID,
  ): Promise<FurnitureStatisticBaseResDto> {
    const { getNumberOfViews, getWeeklyViews, getMonthlyViews, getDailyViews } =
      await this.furnitureStatisticService.getFurnitureStatistic(furnitureId);

    return FurnitureStatisticMapper.toResDto(
      furnitureId,
      getNumberOfViews,
      getWeeklyViews,
      getMonthlyViews,
      getDailyViews,
    );
  }
}
