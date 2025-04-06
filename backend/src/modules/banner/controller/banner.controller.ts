import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../../common/decorators/api-file.decorator';
import { BannerID } from '../../../common/types/entity-ids.type';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { ListBannersQueryDto } from '../dto/req/list-banners.query.dto';
import { BannerResDto } from '../dto/res/banner.res.dto';
import { BannersListResDto } from '../dto/res/banners-list.res.dto';
import { BannerMapper } from '../services/banner.mapper';
import { BannerService } from '../services/banner.service';

@ApiTags('Banners')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannersService: BannerService) {}

  @SkipAuth()
  @Get('getBanners')
  public async getBanners(
    @Query() query: ListBannersQueryDto,
  ): Promise<BannersListResDto> {
    const [entities, total] = await this.bannersService.getBanners(query);
    return BannerMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiFile('photo', false, true)
  @Post('/uploadBanner')
  public async uploadBanner(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    return await this.bannersService.uploadBanner(file);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.ADMIN, UserEnum.MANAGER)
  @Delete(':bannerId')
  public async deleteBanner(
    @Param('bannerId', ParseUUIDPipe) bannerId: BannerID,
  ): Promise<void> {
    return await this.bannersService.deleteBanner(bannerId);
  }

  @SkipAuth()
  @Get(':bannerId')
  public async getBanner(
    @Param('bannerId', ParseUUIDPipe) bannerId: BannerID,
  ): Promise<BannerResDto> {
    return BannerMapper.toResDto(await this.bannersService.getBanner(bannerId));
  }
}
