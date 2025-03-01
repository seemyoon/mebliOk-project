import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { ExtraInfoService } from '../services/extra-info.service';
import { ShippingInfoID } from '../../../common/types/entity-ids.type';

@ApiTags('Extra-Info')
@Controller('extra-info')
export class ExtraInfoController {
  constructor(private readonly extraInfoService: ExtraInfoService) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiBearerAuth()
  @Patch('/editShippingInfo/:shippingInfoId')
  public async editShippingInfo(
    @Param('shippingInfoId', ParseUUIDPipe) shippingInfoId: ShippingInfoID,
  ): Promise<void> {
    await this.extraInfoService.editShippingInfo(shippingInfoId);
  }

  @SkipAuth()
  @Get(':shippingInfoId')
  public async getShippingInfo(
    @Param('shippingInfoId', ParseUUIDPipe) shippingInfoId: ShippingInfoID,
  ): Promise<void> {
    await this.extraInfoService.getShippingInfo(shippingInfoId);
  }
}
