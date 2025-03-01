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
import { FurnitureStatisticRepository } from '../../repository/services/furniture-statistic.repository';
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
    private readonly furnitureStatisticRepository: FurnitureStatisticRepository,
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
    let furnitureStat = await this.furnitureStatisticRepository.findOne({
      where: { furniture_id: furnitureID },
    });

    if (!furnitureStat) {
      furnitureStat = this.furnitureStatisticRepository.create({
        furniture_id: furnitureID,
        count_views: 1,
      });
    } else {
      furnitureStat.count_views += 1;
    }
    await this.furnitureStatisticRepository.save(furnitureStat);

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

    const [brand, category, subcategory, color, material] = await Promise.all([
      this.brandRepository.findByBrandId(brandID),
      this.categoryFurnitureRepository.findByCategoryId(categoryFurnitureID),
      this.subCategoryFurnitureRepository.findBySubCategoryId(
        subCategoryFurnitureID,
      ),
      this.colorRepository.findByColorIds(colorIDs),
      this.materialRepository.findByMaterialIds(materialIDs),
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
      length: dto.length_furniture,
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
    dto: UpdateFurnitureReqDto,
    furnitureId: FurnitureID,
    categoryFurnitureID: CategoryFurnitureID,
    subCategoryFurnitureID: SubCategoryFurnitureID,
    brandID: BrandID,
    colorIDs: ColorID[],
    materialIDs: MaterialID[],
  ): Promise<void> {
    const furniture = await this.returnFurnitureOrThrow(furnitureId);

    const subCategoryFurniture = subCategoryFurnitureID
      ? await this.subCategoryFurnitureRepository.findBySubCategoryId(
          subCategoryFurnitureID,
        )
      : furniture.subcategory;

    if (!subCategoryFurniture) {
      throw new ConflictException('SubCategoryFurniture not found');
    }

    const categoryFurniture = categoryFurnitureID
      ? await this.categoryFurnitureRepository.findByCategoryId(
          categoryFurnitureID,
        )
      : furniture.category;

    if (categoryFurnitureID && subCategoryFurnitureID) {
      if (subCategoryFurniture.category_id !== categoryFurnitureID) {
        throw new ConflictException(
          'SubCategory does not belong to the specified category',
        );
      }
    }

    const [brand, category, subcategory, color, material] = await Promise.all([
      brandID
        ? this.brandRepository.findByBrandId(furniture.brand.id)
        : furniture.brand,
      this.categoryFurnitureRepository.findByCategoryId(categoryFurniture.id),
      this.subCategoryFurnitureRepository.findBySubCategoryId(
        subCategoryFurniture.id,
      ),
      colorIDs
        ? this.colorRepository.findByColorIds(colorIDs)
        : furniture.color,
      materialIDs
        ? this.materialRepository.findByMaterialIds(materialIDs)
        : furniture.material,
    ]);

    [
      { value: brand, message: 'Brand not found' },
      { value: category, message: 'CategoryFurniture not found' },
      { value: subcategory, message: 'SubCategoryFurniture not found' },
      { value: material && material.length > 0, message: 'Material not found' },
      { value: color && color.length > 0, message: 'Color not found' },
    ].forEach(({ value, message }) => {
      if (!value) {
        throw new ConflictException(message);
      }
    });

    const size = await this.sizeRepository.findOne({
      where: { id: furniture.size_id },
    });
    if (size) {
      size.height = dto?.height ?? size.height;
      size.width = dto?.width ?? size.width;
      size.length = dto?.length_furniture ?? size.length;
      await this.sizeRepository.save(size);
    } else {
      throw new ConflictException('Size not found');
    }

    await this.furnitureRepository.update(furnitureId, {
      ...(dto.name && { name: dto.name }),
      ...(dto.description && { description: dto.description }),
      ...(dto.body && { body: dto.body }),
      ...(dto.price && { price: dto.price }),
      ...(dto.weight && { weight: dto.weight }),
      brand,
      category,
      subcategory,
      color: colorIDs.length
        ? await this.colorRepository.findByColorIds(colorIDs)
        : furniture.color,
      material: materialIDs.length
        ? await this.materialRepository.findByMaterialIds(materialIDs)
        : furniture.material,
      // todo. fix an error '[Nest] 419173  - 02/23/2025, 4:41:36 AM   ERROR [ExceptionsHandler] Cannot query across
      //  many-to-many for property color Error: Cannot query across many-to-many for property color'
      // sellerType: OffersTypeEnum.SELLER,
    });
    await this.furnitureRepository.save(furniture);
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
    if (furniture.in_stock && furniture.price) {
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
