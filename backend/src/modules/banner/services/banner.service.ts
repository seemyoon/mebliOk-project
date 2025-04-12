import { BadRequestException, Injectable } from '@nestjs/common';

import { BannerID } from '../../../common/types/entity-ids.type';
import { BannerEntity } from '../../../infrastructure/postgres/entities/banner.entity';
import { FileTypeEnum } from '../../../infrastructure/aws-s3/enum/file-type.enum';
import { AwsS3Service } from '../../../infrastructure/aws-s3/services/aws-s3.service';
import { BannerRepository } from '../../../infrastructure/repository/services/banner.repository';
import { ListBannersQueryDto } from '../dto/req/list-banners.query.dto';

@Injectable()
export class BannerService {
  constructor(
    private readonly bannerRepository: BannerRepository,
    private readonly fileStorageService: AwsS3Service,
  ) {}

  public async getBanners(
    query: ListBannersQueryDto,
  ): Promise<[BannerEntity[], number]> {
    return await this.bannerRepository.findAll(query);
  }

  public async getBanner(bannerId: BannerID): Promise<BannerEntity> {
    return await this.findBannerOrThrow(bannerId);
  }

  public async uploadBanner(file: Express.Multer.File): Promise<void> {
    const banner = this.bannerRepository.create();
    await this.bannerRepository.save(banner);

    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      banner.id,
    );
    await this.bannerRepository.save({ ...banner, photo: filePath });
  }

  public async deleteBanner(bannerID: BannerID): Promise<void> {
    await this.findBannerOrThrow(bannerID);
  }

  private async findBannerOrThrow(bannerId: BannerID): Promise<BannerEntity> {
    const banner = await this.bannerRepository.findByBannerId(bannerId);
    if (!banner) {
      throw new BadRequestException('Banner not found');
    }
    return banner;
  }
}
