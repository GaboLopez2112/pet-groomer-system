import { ConflictException, Injectable } from '@nestjs/common';
import { HeadquartersDto } from './dto/headquarters.dto';
import { UpdateHeadquartersDto } from './dto/headquarters.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Headquarters } from './entities/headquarters.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeadquartersService {
  constructor(
    @InjectRepository(Headquarters)
    private readonly headquartersRepository: Repository<Headquarters>,
  ) {}
  async create(createHeadquartersDto: HeadquartersDto) {
    const existingBranch = await this.headquartersRepository.findOne({
      where: { nombre: createHeadquartersDto.nombre },
    });

    if (existingBranch) {
      throw new ConflictException(
        `La sucursal "${createHeadquartersDto.nombre}" ya existe`,
      );
    }

    const branch = this.headquartersRepository.create(createHeadquartersDto);
    return await this.headquartersRepository.save(branch);
  }

  findAll() {
    return `This action returns all headquarters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} headquarters`;
  }

  update(id: number, updateHeadquartersDto: UpdateHeadquartersDto) {
    return `This action updates a #${id} headquarters`;
  }

  remove(id: number) {
    return `This action removes a #${id} headquarters`;
  }
}
