import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  CategoryFurnitureID,
  SubCategoryFurnitureID,
} from '../../../common/types/entity-ids.type';
import { CategoryFurnitureEntity } from '../../../infrastructure/postgres/entities/category-furniture.entity';
import { SubCategoryFurnitureEntity } from '../../../infrastructure/postgres/entities/subcategory-furniture.entity';
import { CategoryFurnitureRepository } from '../../../infrastructure/repository/services/category-furniture.repository';
import { SubCategoryFurnitureRepository } from '../../../infrastructure/repository/services/subcategory-furniture.repository';
import { CategoryReqDto } from '../dto/req/category.req.dto';
import { ListCategoriesFurnitureQueryDto } from '../dto/req/list-categories-furniture.query.dto';
import { ListSubCategoriesFurnitureQueryDto } from '../dto/req/list-subcategories-furniture.query.dto';
import { SubCategoryReqDto } from '../dto/req/subcategory.req.dto';
import { UpdateCategoryFurnitureReqDto } from '../dto/req/update-category.req.dto';
import { UpdateSubCategoryFurnitureReqDto } from '../dto/req/update-subcategory.req.dto';
import { AwsS3Service } from '../../../infrastructure/aws/services/aws-s3.service';
import { FileTypeEnum } from '../../../infrastructure/aws/enum/file-type.enum';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryFurnitureRepository: CategoryFurnitureRepository,
    private readonly subCategoryFurnitureRepository: SubCategoryFurnitureRepository,
    private readonly fileStorageService: AwsS3Service,
  ) {}

  public async getCategoriesFurniture(
    query: ListCategoriesFurnitureQueryDto,
  ): Promise<[CategoryFurnitureEntity[], number]> {
    return await this.categoryFurnitureRepository.findAll(query);
  }

  public async getSubCategoriesFurniture(
    query: ListSubCategoriesFurnitureQueryDto,
    categoryFurnitureId: CategoryFurnitureID,
  ): Promise<[SubCategoryFurnitureEntity[], number]> {
    return await this.subCategoryFurnitureRepository.findAll(
      categoryFurnitureId,
      query,
    );
  }

  public async uploadCategoryPhoto(
    categoryFurnitureId: CategoryFurnitureID,
    file: Express.Multer.File,
  ): Promise<void> {
    const category =
      await this.categoryFurnitureRepository.findByCategoryId(
        categoryFurnitureId,
      );
    if (!category) throw new NotFoundException('Category not found');

    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      categoryFurnitureId,
    );
    if (category) await this.fileStorageService.deleteFile(category.photo);

    await this.categoryFurnitureRepository.save({
      ...category,
      photo: filePath,
    });
  }

  public async createCategoryFurniture(
    dto: CategoryReqDto,
  ): Promise<CategoryFurnitureEntity> {
    const title = await this.categoryFurnitureRepository.findOneBy({
      title: dto.title,
    });
    if (title) {
      throw new ConflictException("Category's title is already exist");
    }

    return await this.categoryFurnitureRepository.save(
      this.categoryFurnitureRepository.create({
        title: dto.title,
      }),
    );
  }

  public async createSubCategoryFurniture(
    dto: SubCategoryReqDto,
    categoryFurnitureID: CategoryFurnitureID,
  ): Promise<SubCategoryFurnitureEntity> {
    const title = await this.subCategoryFurnitureRepository.findOneBy({
      title: dto.title,
    });
    if (title) {
      throw new ConflictException("SubCategory's title is already exist");
    }

    return await this.subCategoryFurnitureRepository.save(
      this.subCategoryFurnitureRepository.create({
        title: dto.title,
        category_id: categoryFurnitureID,
      }),
    );
  }

  public async editCategoryFurniture(
    dto: UpdateCategoryFurnitureReqDto,
    categoryFurnitureID: CategoryFurnitureID,
  ): Promise<CategoryFurnitureEntity> {
    const category =
      await this.categoryFurnitureRepository.findByCategoryId(
        categoryFurnitureID,
      );
    if (!category) {
      throw new ConflictException('Category not found');
    }
    const title = await this.categoryFurnitureRepository.findOneBy({
      title: dto.title,
    });
    if (title) {
      throw new ConflictException("Category's title is already exist");
    }

    category.title = dto.title;

    return await this.categoryFurnitureRepository.save(category);
  }

  public async editSubCategoryFurniture(
    dto: UpdateSubCategoryFurnitureReqDto,
    subCategoryFurnitureID: SubCategoryFurnitureID,
  ): Promise<SubCategoryFurnitureEntity> {
    const subCategory =
      await this.subCategoryFurnitureRepository.findBySubCategoryId(
        subCategoryFurnitureID,
      );
    if (!subCategory) {
      throw new ConflictException('SubCategory not found');
    }
    const title = await this.subCategoryFurnitureRepository.findOneBy({
      title: dto.title,
    });
    if (title) {
      throw new ConflictException("SubCategory's title is already exist");
    }

    subCategory.title = dto.title;

    return await this.subCategoryFurnitureRepository.save(subCategory);
  }

  public async getCategoryFurniture(
    categoryFurnitureID: CategoryFurnitureID,
  ): Promise<CategoryFurnitureEntity> {
    const category =
      await this.categoryFurnitureRepository.findByCategoryId(
        categoryFurnitureID,
      );
    if (!category) {
      throw new ConflictException('Category not found');
    }
    return category;
  }

  public async getSubCategoryFurnitureOne(
    subCategoryFurnitureID: SubCategoryFurnitureID,
  ): Promise<SubCategoryFurnitureEntity> {
    const subCategory =
      await this.subCategoryFurnitureRepository.findBySubCategoryId(
        subCategoryFurnitureID,
      );
    if (!subCategory) {
      throw new ConflictException('SubCategory not found');
    }
    return subCategory;
  }
}
