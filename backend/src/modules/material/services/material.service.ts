import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { MaterialID } from '../../../common/types/entity-ids.type';
import { MaterialEntity } from '../../../database/entities/material.entity';
import { MaterialRepository } from '../../repository/services/material.repository';
import { ListMaterialsQueryDto } from '../dto/req/list-materials.query.dto';
import { MaterialReqDto } from '../dto/req/material.req.dto';
import { UpdateMaterialReqDto } from '../dto/req/update-material.req.dto';

@Injectable()
export class MaterialService {
  constructor(private readonly materialRepository: MaterialRepository) {}

  public async getMaterials(
    query: ListMaterialsQueryDto,
  ): Promise<[MaterialEntity[], number]> {
    return await this.materialRepository.findAll(query);
  }

  public async getMaterial(materialId: MaterialID): Promise<MaterialEntity> {
    const material = await this.materialRepository.findByMaterialId(materialId);
    if (!material) {
      throw new BadRequestException('Material not found');
    }
    return material;
  }

  public async createMaterial(dto: MaterialReqDto): Promise<MaterialEntity> {
    const material = await this.materialRepository.findOneBy({
      material_name: dto.material_name,
    });
    if (material) {
      throw new ConflictException('Material is already exist');
    }

    return await this.materialRepository.save(
      this.materialRepository.create({
        material_name: dto.material_name,
      }),
    );
  }

  public async editMaterial(
    dto: UpdateMaterialReqDto,
    materialId: MaterialID,
  ): Promise<MaterialEntity> {
    const material = await this.materialRepository.findByMaterialId(materialId);
    if (!material) {
      throw new BadRequestException('Material not found');
    }
    const materialName = await this.materialRepository.findOneBy({
      material_name: dto.material_name,
    });
    if (materialName) {
      throw new ConflictException('Material is already exist');
    }

    material.material_name = dto.material_name;

    return await this.materialRepository.save(material);
  }
}
