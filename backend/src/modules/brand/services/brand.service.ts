import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { BrandID } from '../../../common/types/entity-ids.type';
import { BrandEntity } from '../../../database/entities/brand.entity';
import { BrandRepository } from '../../repository/services/brand.repository';
import { ListUsersQueryDto } from '../../user/models/req/list-users.query.dto';
import { BrandReqDto } from '../dto/req/brand.req.dto';
import { UpdateBrandReqDto } from '../dto/req/update-brand.req.dto';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  public async getBrands(
    query: ListUsersQueryDto,
  ): Promise<[BrandEntity[], number]> {
    return await this.brandRepository.findAll(query);
  }

  public async getBrand(brandId: BrandID): Promise<BrandEntity> {
    const brand = await this.brandRepository.findByBrandId(brandId);
    if (!brand) {
      throw new BadRequestException('Brand not found');
    }
    return brand;
  }

  public async createBrand(dto: BrandReqDto): Promise<BrandEntity> {
    const brand = await this.brandRepository.findOneBy({
      brand_name: dto.brand_name,
    });
    if (brand) {
      throw new ConflictException('Brand is already exist');
    }

    return await this.brandRepository.save(
      this.brandRepository.create({
        brand_name: dto.brand_name,
      }),
    );
  }

  public async editBrand(
    dto: UpdateBrandReqDto,
    brandId: BrandID,
  ): Promise<BrandEntity> {
    const brand = await this.brandRepository.findByBrandId(brandId);
    if (!brand) {
      throw new BadRequestException('Brand not found');
    }
    const brandName = await this.brandRepository.findOneBy({
      brand_name: dto.brand_name,
    });
    if (brandName) {
      throw new ConflictException('Brand is already exist');
    }

    brand.brand_name = dto.brand_name;

    return await this.brandRepository.save(brand);
  }
}
