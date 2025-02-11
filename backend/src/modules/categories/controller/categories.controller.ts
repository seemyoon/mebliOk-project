import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  public async getSubCategoriesFurniture(): Promise<any> {}
  public async getCategoriesFurniture(): Promise<any> {}
  public async getSubCategoryFurniture(): Promise<any> {}
  public async getCategoryFurniture(): Promise<any> {}
  public async createSubCategoryFurniture(): Promise<any> {}
  public async createCategoryFurniture(): Promise<any> {}
}
