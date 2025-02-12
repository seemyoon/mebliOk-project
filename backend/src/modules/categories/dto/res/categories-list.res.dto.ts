import { ListCategoriesFurnitureQueryDto } from '../req/list-categories-furniture.query.dto';
import { CategoryFurnitureResDto } from './category-furniture.res.dto';

export class CategoriesFurnitureListResDto extends ListCategoriesFurnitureQueryDto {
  data: CategoryFurnitureResDto[];
  total: number;
}
