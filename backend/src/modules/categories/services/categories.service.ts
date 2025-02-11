import { Injectable } from '@nestjs/common';

import { BrandRepository } from '../../repository/services/brand.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly brandRepository: BrandRepository) {}

  public async getSubCategoriesFurniture(): Promise<any> {}

  public async getCategoriesFurniture(): Promise<any> {}

  public async getSubCategoryFurniture(): Promise<any> {}

  public async getCategoryFurniture(): Promise<any> {}

  public async createSubCategoryFurniture(): Promise<any> {}

  public async createCategoryFurniture(): Promise<any> {}
}
