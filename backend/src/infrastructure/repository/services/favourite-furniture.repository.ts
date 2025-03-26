import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FavouriteFurnitureID } from '../../../common/types/entity-ids.type';
import { IUserData } from '../../../modules/auth/interfaces/user-data.interface';
import { ListFavouriteFurnitureQueryDto } from '../../../modules/furniture/dto/req/list-favourite-furniture-query.dto';
import { FavouriteFurnitureEntity } from '../../postgres/entities/favourite-furniture.entity';

@Injectable()
export class FavouriteFurnitureRepository extends Repository<FavouriteFurnitureEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FavouriteFurnitureEntity, dataSource.manager);
  }

  public async findByFavoriteFurnitureID(
    favoriteFurnitureID: FavouriteFurnitureID,
  ): Promise<FavouriteFurnitureEntity> {
    const qb = this.createQueryBuilder('favouriteFurniture').where(
      'favouriteFurniture.id = :favoriteFurnitureID',
      {
        favoriteFurnitureID,
      },
    );
    return await qb.getOne();
  }

  public async findAll(
    query: ListFavouriteFurnitureQueryDto,
    userData: IUserData,
  ): Promise<[FavouriteFurnitureEntity[], number]> {
    const qb = this.createQueryBuilder('favouriteFurniture');
    qb.leftJoinAndSelect('favouriteFurniture.furniture', 'furniture');
    qb.leftJoinAndSelect('favouriteFurniture.user', 'user');

    qb.take(query.limit);
    qb.skip(query.offset);

    qb.where('user.id = :userId', {
      userId: userData.userId,
    });

    return await qb.getManyAndCount();
  }
}
