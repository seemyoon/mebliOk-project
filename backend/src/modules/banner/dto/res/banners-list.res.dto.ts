import { ListBannersQueryDto } from '../req/list-banners.query.dto';
import { BannerResDto } from './banner.res.dto';

export class BannersListResDto extends ListBannersQueryDto {
  data: BannerResDto[];
  total: number;
}
