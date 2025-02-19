import { ListMaterialsQueryDto } from '../req/list-materials.query.dto';
import { MaterialResDto } from './material.res.dto';

export class MaterialsListResDto extends ListMaterialsQueryDto {
  data: MaterialResDto[];
  total: number;
}
