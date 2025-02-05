import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/users.entity';
import { ListUsersQueryDto } from '../../user/models/req/list-users.query.dto';

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

  public async findByEmail(email: string) {
    const qb = this.createQueryBuilder('user').where('user.email = :email', {
      email,
    });

    return await qb.getOne();
  }

  public async findAll(
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user');

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
