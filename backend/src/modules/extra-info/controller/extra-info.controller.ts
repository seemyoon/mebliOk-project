import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../../common/decorators/api-file.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { UpdatePaymentInfoReqDto } from '../dto/req/update-payment-info.req.dto';
import { UpdateShippingInfoReqDto } from '../dto/req/update-shipping-info.req.dto';
import { PaymentInfoResDto } from '../dto/res/payment-info.res.dto';
import { ShippingInfoResDto } from '../dto/res/shipping-info.res.dto';
import { ExtraInfoMapper } from '../services/extra-info.mapper';
import { ExtraInfoService } from '../services/extra-info.service';

@ApiTags('Extra-Info')
@Controller('extra-info')
export class ExtraInfoController {
  constructor(private readonly extraInfoService: ExtraInfoService) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiFile('photo', false, true)
  @Post('/uploadPhotosShippingInfo')
  public async uploadPhotosShippingInfo(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.extraInfoService.uploadPhotosShippingInfo(file);
  }

  @SkipAuth()
  @Get('/getPaymentInfo')
  public async getPaymentInfo(): Promise<PaymentInfoResDto> {
    return ExtraInfoMapper.toResPaymentInfoDto(
      await this.extraInfoService.getPaymentInfo(),
    );
  }

  @SkipAuth()
  @Get('/getShippingInfo')
  public async getShippingInfo(): Promise<ShippingInfoResDto> {
    return ExtraInfoMapper.toResShippingInfoDto(
      await this.extraInfoService.getShippingInfo(),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiBearerAuth()
  @Patch('/editShippingInfo/:shippingInfoId')
  public async editShippingInfo(
    @Body() dto: UpdateShippingInfoReqDto,
  ): Promise<ShippingInfoResDto> {
    return ExtraInfoMapper.toResShippingInfoDto(
      await this.extraInfoService.editShippingInfo(dto),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiBearerAuth()
  @Patch('/editPaymentInfo/:paymentInfoId')
  public async editPaymentInfo(
    @Body() dto: UpdatePaymentInfoReqDto,
  ): Promise<PaymentInfoResDto> {
    return ExtraInfoMapper.toResPaymentInfoDto(
      await this.extraInfoService.editPaymentInfo(dto),
    );
  }
}
