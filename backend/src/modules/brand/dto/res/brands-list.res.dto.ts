import { ListBrandsQueryDto } from '../req/list-brands.query.dto';
import { BrandResDto } from './brand.res.dto';

export class BrandsListResDto extends ListBrandsQueryDto {
  data: BrandResDto[];
  total: number;
}
