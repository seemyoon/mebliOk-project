import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CustomerInfoID } from '../../../common/types/entity-ids.type';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { CreateCustomerInfoReqDto } from '../dto/req/create-customer-info.req.dto';
import { ListCustomersInfoQueryDto } from '../dto/req/list-customers-info-query.dto';
import { UpdateCustomerReqDto } from '../dto/req/update-customer.req.dto';
import { ListCustomersInfoResDto } from '../dto/res/customer-info-list-res-dto';
import { CustomerInfoResDto } from '../dto/res/customer-info-res.dto';
import { CustomerInfoMapper } from '../services/customer-info.mapper';
import { CustomerInfoService } from '../services/customer-info.service';

@ApiTags('Customer-info')
@Controller('customer-info')
export class CustomerInfoController {
  constructor(private readonly customerInfoService: CustomerInfoService) {}

  @SkipAuth()
  @Get('getAllCustomersInfo')
  public async getAllCustomersInfo(
    @Query() query: ListCustomersInfoQueryDto,
  ): Promise<ListCustomersInfoResDto> {
    const [entities, total] =
      await this.customerInfoService.getAllCustomersInfo(query);
    return CustomerInfoMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @Get('/addCustomerInfo')
  public async addCustomerInfo(
    @Body() dto: CreateCustomerInfoReqDto,
  ): Promise<CustomerInfoResDto> {
    return CustomerInfoMapper.toResDto(
      await this.customerInfoService.addCustomerInfo(dto),
    );
  }

  @SkipAuth()
  @Get('/getCustomerInfo/:customerInfoId')
  public async getCustomerInfo(
    @Param('customerInfoId') customerInfoId: CustomerInfoID,
  ): Promise<CustomerInfoResDto> {
    return CustomerInfoMapper.toResDto(
      await this.customerInfoService.getCustomerInfo(customerInfoId),
    );
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN)
  @ApiBearerAuth()
  @Patch('/editCustomerInfo/:CustomerInfoId')
  public async editCustomerInfo(
    @Body() dto: UpdateCustomerReqDto,
  ): Promise<CustomerInfoResDto> {
    return CustomerInfoMapper.toResDto(
      await this.customerInfoService.editCustomerInfo(dto),
    );
  }
}
