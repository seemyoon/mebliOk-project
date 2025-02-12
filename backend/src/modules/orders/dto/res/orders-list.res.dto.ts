import { ListOrdersQueryDto } from '../req/list-orders.query.dto';
import { OrderResDto } from './order.res.dto';

export class OrdersListResDto extends ListOrdersQueryDto {
  data: OrderResDto[];
  total: number;
}
