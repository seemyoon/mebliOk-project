import { ListCustomersInfoQueryDto } from '../req/list-customers-info-query.dto';
import { CustomerInfoResDto } from './customer-info-res.dto';

export class ListCustomersInfoResDto extends ListCustomersInfoQueryDto {
  data: CustomerInfoResDto[];
  total: number;
}
