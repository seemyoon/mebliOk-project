import { ConflictException, Injectable } from '@nestjs/common';

import { FurnitureID } from '../../../common/types/entity-ids.type';
import { FurnitureEntity } from '../../../database/entities/furniture.entity';
import { FileTypeEnum } from '../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { BrandRepository } from '../../repository/services/brand.repository';
import { FurnitureRepository } from '../../repository/services/furniture.repository';
import { SellerEnum } from '../../user/enum/seller.enum';
import { CreateFurnitureReqDto } from '../dto/req/create-furniture.req.dto';
import { ListFurnitureQueryDto } from '../dto/req/list-furniture-query.dto';
import { UpdateFurnitureReqDto } from '../dto/req/update-furniture.req.dto';

@Injectable()
export class FurnitureService {
  constructor(
    private readonly furnitureRepository: FurnitureRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly brandRepository: BrandRepository,
  ) {}

  public async getAllFurniture(
    query: ListFurnitureQueryDto,
  ): Promise<[FurnitureEntity[], number]> {
    return await this.furnitureRepository.findAll(query);
  }

  public async deleteFurniture(furnitureID: FurnitureID): Promise<void> {
    await this.furnitureRepository.remove(
      await this.returnFurnitureOrThrow(furnitureID),
    );
  }

  public async uploadFurnitureImage(
    furnitureID: FurnitureID,
    file: Express.Multer.File,
  ): Promise<void> {
    const furniture = await this.getFurniture(furnitureID);
    if (!furniture) {
      throw new ConflictException('furniture not found');
    }
    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      furnitureID,
    );

    await this.furnitureRepository.save({ ...furniture, photos: [filePath] });
  }

  public async getFurniture(
    furnitureID: FurnitureID,
  ): Promise<FurnitureEntity> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureID);
    if (!furniture) {
      throw new ConflictException('Furniture not found');
    }

    return furniture;
  }

  public async createFurniture(
    dto: CreateFurnitureReqDto,
  ): Promise<FurnitureEntity> {
    const furniture = await this.furnitureRepository.findOneBy({
      name: dto.name,
    });
    if (furniture) {
      throw new ConflictException('Furniture already exists');
    }
    const brand = await this.brandRepository.findOneBy({
      brand_name: dto.brand,
    });
    if (!brand) {
      throw new ConflictException('Brand not found');
    }

    const newFurniture = this.furnitureRepository.create({
      name: dto.name,
      brand,
      description: dto.description,
      body: dto.body,
      color: dto.color,
      price: dto.price,
      discount: dto?.discount,
      sellerType: SellerEnum.SELLER, // todo. its temporary
    });

    return await this.furnitureRepository.save(newFurniture);
  }

  public async editFurniture(
    furnitureId: FurnitureID,
    dto: UpdateFurnitureReqDto,
  ): Promise<void> {
    const furniture = await this.returnFurnitureOrThrow(furnitureId);
    if (!furniture) {
      throw new ConflictException('Furniture not found');
    }

    const brand = await this.brandRepository.findOneBy({
      brand_name: dto.brand,
    });
    if (!brand) {
      throw new ConflictException('Brand not found');
    }

    await this.furnitureRepository.update(furnitureId, {
      name: dto.name,
      brand,
      description: dto.description,
      body: dto.body,
      color: dto.color,
      price: dto.price,
      discount: dto.discount,
    });
  }

  public async activeDiscount(furnitureId: FurnitureID): Promise<void> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureId);
    if (!furniture) {
      throw new ConflictException('Furniture not found');
    }
    if (furniture.is_discount == true) furniture.is_discount = false;
    else if (furniture.is_discount == false) furniture.is_discount = true;

    await this.furnitureRepository.save(furniture);
  }

  private async returnFurnitureOrThrow(
    furnitureId: FurnitureID,
  ): Promise<FurnitureEntity> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureId);
    if (!furniture) {
      throw new ConflictException('furniture not found');
    }
    return furniture;
  }
}
