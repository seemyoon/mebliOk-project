import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { ColorID } from '../../../common/types/entity-ids.type';
import { ColorEntity } from '../../../infrastructure/postgres/entities/color.entity';
import { ColorRepository } from '../../../infrastructure/repository/services/color.repository';
import { ColorReqDto } from '../dto/req/color.req.dto';
import { ListColorsQueryDto } from '../dto/req/list-colors.query.dto';
import { UpdateColorReqDto } from '../dto/req/update-color.req.dto';

@Injectable()
export class ColorService {
  constructor(private readonly colorRepository: ColorRepository) {}

  public async getColors(
    query: ListColorsQueryDto,
  ): Promise<[ColorEntity[], number]> {
    return await this.colorRepository.findAll(query);
  }

  public async getColor(colorId: ColorID): Promise<ColorEntity> {
    const color = await this.colorRepository.findByColorId(colorId);
    if (!color) {
      throw new BadRequestException('Color not found');
    }
    return color;
  }

  public async createColor(dto: ColorReqDto): Promise<ColorEntity> {
    const color = await this.colorRepository.findOneBy({
      color_name: dto.color_name,
    });
    if (color) {
      throw new ConflictException('Color is already exist');
    }

    return await this.colorRepository.save(
      this.colorRepository.create({
        color_name: dto.color_name,
      }),
    );
  }

  public async editColor(
    dto: UpdateColorReqDto,
    colorId: ColorID,
  ): Promise<ColorEntity> {
    const color = await this.colorRepository.findByColorId(colorId);
    if (!color) {
      throw new BadRequestException('Color not found');
    }
    const colorName = await this.colorRepository.findOneBy({
      color_name: dto.color_name,
    });
    if (colorName) {
      throw new ConflictException('Color is already exist');
    }

    color.color_name = dto.color_name;

    return await this.colorRepository.save(color);
  }
}
