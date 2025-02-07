import { ConflictException, Injectable } from '@nestjs/common';

import { FurnitureID } from '../../../common/types/entity-ids.type';
import { FurnitureEntity } from '../../../database/entities/furniture.entity';
import { FurnitureRepository } from '../../repository/services/furniture.repository';
import { CreateFurnitureReqDto } from '../dto/req/create-furniture.req.dto';
import { ListFurnitureQueryDto } from '../dto/req/list-furniture-query.dto';
import { UpdateFurnitureReqDto } from '../dto/req/update-furniture.req.dto';

@Injectable()
export class FurnitureService {
  constructor(
    private readonly furnitureRepository: FurnitureRepository,
  ) {}

  public async getAllFurniture(
    query: ListFurnitureQueryDto,
  ): Promise<[FurnitureEntity[], number]> {
    return await this.furnitureRepository.findAll(query);
  }

  public async deleteFurniture(furnitureID: FurnitureID): Promise<void> {
    await this.furnitureRepository.remove(
      await this.returnFurnitureOrThrow(furnitureID),
    );
  }

  public async getFurniture(
    furnitureID: FurnitureID,
  ): Promise<FurnitureEntity> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureID);
    if (!furniture) {
      throw new ConflictException('Article not found');
    }

    return furniture;
  }

  public async createFurniture(
    dto: CreateFurnitureReqDto,
  ): Promise<FurnitureEntity> {
    const furniture = this.furnitureRepository.create({
      name: dto.name,
      brand: dto.brand,
      description: dto.description,
      body: dto.body,
      color: dto.color,
      price: dto.price,
      discount: dto.discount,
    });

    return await this.furnitureRepository.save(furniture);
  }

  public async editFurniture(
    furnitureId: FurnitureID,
    dto: UpdateFurnitureReqDto,
  ): Promise<void> {
    const furniture = await this.returnFurnitureOrThrow(furnitureId);
    if (!furniture) {
      throw new ConflictException('Furniture not found');
    }

    await this.furnitureRepository.update(furnitureId, {
      name: dto.name,
      brand: dto.brand,
      description: dto.description,
      body: dto.body,
      color: dto.color,
      price: dto.price,
      discount: dto.discount,
    });
  }

  public async activeDiscount(furnitureId: FurnitureID): Promise<void> {
    const furniture =
      await this.furnitureRepository.findByFurnitureId(furnitureId);
    if (!furniture) {
      throw new ConflictException('Furniture not found');
    }
    if (furniture.is_discount == true) furniture.is_discount = false;
    else if (furniture.is_discount == false) furniture.is_discount = true;

    await this.furnitureRepository.save(furniture);
  }

  private async returnFurnitureOrThrow(
    furnitureId: FurnitureID,
  ): Promise<FurnitureEntity> {
    const article =
      await this.furnitureRepository.findByFurnitureId(furnitureId);
    if (!article) {
      throw new ConflictException('Article not found');
    }
    return article;
  }
}
