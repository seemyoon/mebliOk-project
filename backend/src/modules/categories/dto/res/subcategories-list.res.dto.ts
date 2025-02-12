import { ListSubCategoriesFurnitureQueryDto } from '../req/list-subcategories-furniture.query.dto';
import { SubCategoryFurnitureResDto } from './subcategory-furniture.res.dto';

export class SubCategoriesFurnitureListResDto extends ListSubCategoriesFurnitureQueryDto {
  data: SubCategoryFurnitureResDto[];
  total: number;
}
