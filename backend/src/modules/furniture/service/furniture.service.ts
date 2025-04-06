import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  BrandID,
  CategoryFurnitureID,
  ColorID,
  FavouriteFurnitureID,
  FurnitureID,
  MaterialID,
  SubCategoryFurnitureID,
} from '../../../common/types/entity-ids.type';
import { FavouriteFurnitureEntity } from '../../../infrastructure/postgres/entities/favourite-furniture.entity';
import { FurnitureEntity } from '../../../infrastructure/postgres/entities/furniture.entity';
import { BrandRepository } from '../../../infrastructure/repository/services/brand.repository';
import { CategoryFurnitureRepository } from '../../../infrastructure/repository/services/category-furniture.repository';
import { ColorRepository } from '../../../infrastructure/repository/services/color.repository';
import { FavouriteFurnitureRepository } from '../../../infrastructure/repository/services/favourite-furniture.repository';
import { FurnitureRepository } from '../../../infrastructure/repository/services/furniture.repository';
import { FurnitureStatisticRepository } from '../../../infrastructure/repository/services/furniture-statistic.repository';
import { IsShowPriceRepository } from '../../../infrastructure/repository/services/is-show-price.repository';
import { MaterialRepository } from '../../../infrastructure/repository/services/material.repository';
import { SizeRepository } from '../../../infrastructure/repository/services/size.repository';
import { SubCategoryFurnitureRepository } from '../../../infrastructure/repository/services/subcategory-furniture.repository';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { FileTypeEnum } from '../../../infrastructure/file-storage/enum/file-type.enum';
import { FileStorageService } from '../../../infrastructure/file-storage/services/file-storage.service';
import { SellerEnum } from '../../user/enum/seller.enum';
import { AssignDiscountReqDto } from '../dto/req/assign-discount.req.dto';
import { CreateFurnitureReqDto } from '../dto/req/create-furniture.req.dto';
import { ListFavouriteFurnitureQueryDto } from '../dto/req/list-favourite-furniture-query.dto';
import { ListFurnitureQueryDto } from '../dto/req/list-furniture-query.dto';
import { UpdateFurnitureReqDto } from '../dto/req/update-furniture.req.dto';
import { CurrencyEnum } from '../enum/currency.enum';

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
    private readonly isShowPriceRepository: IsShowPriceRepository,
    private readonly favouriteFurnitureRepository: FavouriteFurnitureRepository,
  ) {}

  public async getAllFurniture(
    query: ListFurnitureQueryDto,
  ): Promise<[FurnitureEntity[], number]> {
    return await this.furnitureRepository.findAll(query);
  }

  public async deleteFavoriteFurniture(
    favoriteFurnitureId: FavouriteFurnitureID,
  ): Promise<void> {
    const favoriteFurniture =
      await this.favouriteFurnitureRepository.findByFavoriteFurnitureID(
        favoriteFurnitureId,
      );
    if (!favoriteFurniture) throw new NotFoundException('Furniture not found');

    await this.favouriteFurnitureRepository.remove(favoriteFurniture);
  }

  public async getAllFavouriteFurniture(
    query: ListFavouriteFurnitureQueryDto,
    userData: IUserData,
  ): Promise<[FavouriteFurnitureEntity[], number]> {
    return await this.favouriteFurnitureRepository.findAll(query, userData);
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

  public async pickShowPriceForAllFurnitureOrNot(): Promise<void> {
    const count = await this.isShowPriceRepository.count();

    if (count > 1)
      throw new ConflictException('Info about showing price must be only one');

    let infoAboutShowingPrice = await this.isShowPriceRepository.findOne({
      where: {},
    });

    if (count === 0) {
      infoAboutShowingPrice = await this.isShowPriceRepository.save(
        this.isShowPriceRepository.create({
          isShowPrice: false,
        }),
      );
    }

    infoAboutShowingPrice.isShowPrice = !infoAboutShowingPrice.isShowPrice;

    await this.isShowPriceRepository.save(infoAboutShowingPrice);
  }

  public async getFurniture(
    furnitureID: FurnitureID,
  ): Promise<FurnitureEntity> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureID);
    if (!furniture) {
      throw new NotFoundException('Furniture not found');
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

  public async addFavouriteFurniture(
    furnitureID: FurnitureID,
  ): Promise<FavouriteFurnitureEntity> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureID);
    if (!furniture) {
      throw new ConflictException('Furniture not found');
    }
    return await this.favouriteFurnitureRepository.save(
      this.favouriteFurnitureRepository.create({
        furniture,
      }),
    );
  }

  public async getFavouriteFurniture(
    favouriteFurnitureId: FavouriteFurnitureID,
  ): Promise<FavouriteFurnitureEntity> {
    const favFurniture =
      await this.favouriteFurnitureRepository.findByFavoriteFurnitureID(
        favouriteFurnitureId,
      );
    if (!favFurniture) {
      throw new ConflictException('Favourite furniture not found');
    }
    return favFurniture;
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
      currency: CurrencyEnum.UAH,
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

  public async activeSale(furnitureId: FurnitureID): Promise<void> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureId);
    if (!furniture) throw new ConflictException('Furniture not found');

    furniture.isSale = !furniture.isSale;

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
