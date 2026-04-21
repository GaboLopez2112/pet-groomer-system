import { Injectable } from '@nestjs/common';
import { CreateHeadquartersDto } from './dto/create-headquarters.dto';
import { UpdateHeadquartersDto } from './dto/update-headquarters.dto';

@Injectable()
export class HeadquartersService {
  create(createHeadquartersDto: CreateHeadquartersDto) {
    return 'This action adds a new headquarters';
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
