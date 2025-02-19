import { ConflictException, Injectable } from '@nestjs/common';

import {
  BrandID,
  CategoryFurnitureID,
  ColorID,
  FurnitureID,
  MaterialID,
  SubCategoryFurnitureID,
} from '../../../common/types/entity-ids.type';
import { FurnitureEntity } from '../../../database/entities/furniture.entity';
import { FileTypeEnum } from '../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { BrandRepository } from '../../repository/services/brand.repository';
import { CategoryFurnitureRepository } from '../../repository/services/category-furniture.repository';
import { ColorRepository } from '../../repository/services/color.repository';
import { FurnitureRepository } from '../../repository/services/furniture.repository';
import { MaterialRepository } from '../../repository/services/material.repository';
import { SizeRepository } from '../../repository/services/size.repository';
import { SubCategoryFurnitureRepository } from '../../repository/services/subcategory-furniture.repository';
import { SellerEnum } from '../../user/enum/seller.enum';
import { AssignDiscountReqDto } from '../dto/req/assign-discount.req.dto';
import { CreateFurnitureReqDto } from '../dto/req/create-furniture.req.dto';
import { ListFurnitureQueryDto } from '../dto/req/list-furniture-query.dto';
import { UpdateFurnitureReqDto } from '../dto/req/update-furniture.req.dto';

@Injectable()
export class FurnitureService {
  constructor(
    private readonly furnitureRepository: FurnitureRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly brandRepository: BrandRepository,
    private readonly categoryFurnitureRepository: CategoryFurnitureRepository,
    private readonly subCategoryFurnitureRepository: SubCategoryFurnitureRepository,
    private readonly materialRepository: MaterialRepository,
    private readonly colorRepository: ColorRepository,
    private readonly sizeRepository: SizeRepository,
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
    await this.returnFurnitureOrThrow(furnitureID);

    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureID);

    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      furnitureID,
    );

    await this.furnitureRepository.save({
      ...furniture,
      photos: [...(furniture.photos || []), filePath],
    });
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
    categoryFurnitureID: CategoryFurnitureID,
    subCategoryFurnitureID: SubCategoryFurnitureID,
    brandID: BrandID,
    colorIDs: ColorID[],
    materialIDs: MaterialID[],
  ): Promise<FurnitureEntity> {
    const furniture = await this.furnitureRepository.findOneBy({
      name: dto.name,
    });
    if (furniture) {
      throw new ConflictException('Furniture already exists');
    }

    const subCategoryFurniture =
      await this.subCategoryFurnitureRepository.findBySubCategoryId(
        subCategoryFurnitureID,
      );

    if (!subCategoryFurniture) {
      throw new ConflictException('SubCategoryFurniture not found');
    }

    if (subCategoryFurniture.category_id !== categoryFurnitureID) {
      throw new ConflictException(
        'SubCategory does not belong to the specified category',
      );
    }

    const [brand, category, subcategory, material, color] = await Promise.all([
      this.brandRepository.findByBrandId(brandID),
      this.categoryFurnitureRepository.findByCategoryId(categoryFurnitureID),
      this.subCategoryFurnitureRepository.findBySubCategoryId(
        subCategoryFurnitureID,
      ),
      this.materialRepository.findByMaterialIds(materialIDs),
      this.colorRepository.findByColorIds(colorIDs),
    ]);

    [
      { value: brand, message: 'Brand not found' },
      { value: category, message: 'CategoryFurniture not found' },
      { value: subcategory, message: 'SubCategoryFurniture not found' },
      { value: material.length > 0, message: 'Material not found' },
      { value: color.length > 0, message: 'Color not found' },
    ].forEach(({ value, message }) => {
      if (!value) {
        throw new ConflictException(message);
      }
    });

    const size = this.sizeRepository.create({
      height: dto.height,
      width: dto.width,
      length: dto.length,
    });

    await this.sizeRepository.save(size);

    const newFurniture = this.furnitureRepository.create({
      name: dto.name,
      brand,
      description: dto?.description || null,
      body: dto?.body || null,
      in_stock: true,
      category,
      subcategory,
      color,
      size,
      price: dto.price,
      weight: dto?.weight,
      material,
      sellerType: SellerEnum.SELLER, // todo. its temporary
    });

    return await this.furnitureRepository.save(newFurniture);
  }

  public async editFurniture(
    furnitureId: FurnitureID,
    categoryFurnitureID: CategoryFurnitureID | null,
    subCategoryFurnitureID: SubCategoryFurnitureID | null,
    brandID: BrandID | null,
    colorIDs: ColorID[] | null,
    materialIDs: MaterialID[] | null,
    dto: UpdateFurnitureReqDto | null,
  ): Promise<void> {
    const furniture = await this.returnFurnitureOrThrow(furnitureId);

    const subCategoryFurniture =
      await this.subCategoryFurnitureRepository.findBySubCategoryId(
        subCategoryFurnitureID,
      );

    if (!subCategoryFurniture) {
      throw new ConflictException('SubCategoryFurniture not found');
    }

    if (subCategoryFurniture.category_id !== categoryFurnitureID) {
      throw new ConflictException(
        'SubCategory does not belong to the specified category',
      );
    }

    const [brand, category, subcategory, material, color] = await Promise.all([
      brandID ? this.brandRepository.findByBrandId(brandID) : null,
      categoryFurnitureID
        ? this.categoryFurnitureRepository.findByCategoryId(categoryFurnitureID)
        : null,
      subCategoryFurnitureID
        ? this.subCategoryFurnitureRepository.findBySubCategoryId(
            subCategoryFurnitureID,
          )
        : null,
      materialIDs?.length > 0
        ? this.materialRepository.findByMaterialIds(materialIDs)
        : null,
      colorIDs?.length > 0
        ? this.colorRepository.findByColorIds(colorIDs)
        : null,
    ]);

    [
      { value: brandID && !brand, message: 'Brand not found' },
      {
        value: categoryFurnitureID && !category,
        message: 'CategoryFurniture not found',
      },
      {
        value: subCategoryFurnitureID && !subcategory,
        message: 'SubCategoryFurniture not found',
      },
      { value: materialIDs && !material, message: 'Material not found' },
      { value: colorIDs && !color, message: 'Color not found' },
    ].forEach(({ value, message }) => {
      if (value) {
        throw new ConflictException(message);
      }
    });

    const size = await this.sizeRepository.findOne({
      where: { id: furniture.size_id },
    });
    if (size) {
      size.height = dto?.height;
      size.width = dto?.width;
      size.length = dto?.length;
      await this.sizeRepository.save(size);
    } else {
      throw new ConflictException('Size not found');
    }

    await this.furnitureRepository.update(furnitureId, {
      name: dto.name,
      brand,
      description: dto?.description || null,
      body: dto?.body || null,
      category,
      subcategory,
      color,
      size,
      price: dto.price,
      weight: dto?.weight,
      material,
      // sellerType: SellerEnum.SELLER,
    });
  }

  public async assignDiscount(
    furnitureId: FurnitureID,
    dto: AssignDiscountReqDto,
  ): Promise<void> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureId);
    if (!furniture) {
      throw new ConflictException('Furniture not found');
    }
    if (furniture.in_stock && furniture.discount && furniture.price) {
      furniture.discount = dto.discount;
    }
    await this.furnitureRepository.save(furniture);
  }

  public async activeStock(furnitureId: FurnitureID): Promise<void> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureId);
    if (!furniture) {
      throw new ConflictException('Furniture not found');
    }
    furniture.in_stock = !furniture.in_stock;

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
