import { SizeID } from '../../../../common/types/entity-ids.type';

export class SizeResDto {
  id: SizeID;
  height?: number;
  width?: number;
  length?: number;
  deleted?: Date;
}
