import { FavouriteFurnitureID } from '../../../../common/types/entity-ids.type';
import { FurnitureBaseResDto } from './base-furniture.res.dto';

export class FurnitureFavouriteResDto {
  id: FavouriteFurnitureID;
  furniture: FurnitureBaseResDto;
}
