import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { ListUsersQueryDto } from '../../../modules/user/models/req/list-users.query.dto';
import { UserEntity } from '../../postgres/entities/users.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async findUser(userId: UserID): Promise<UserEntity> {
    const qb = this.createQueryBuilder('user').where('user.id = :userId', {
      userId,
    });

    return await qb.getOne();
  }

  public async findAll(
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user');
    if (query.search) {
      qb.andWhere(
        'CONCAT(user.name, user.email, user.phoneNumber) ILIKE :search',
      );
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
