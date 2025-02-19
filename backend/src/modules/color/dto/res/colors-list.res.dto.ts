import { ListColorsQueryDto } from '../req/list-colors.query.dto';
import { ColorResDto } from './color.res.dto';

export class ColorsListResDto extends ListColorsQueryDto {
  data: ColorResDto[];
  total: number;
}
