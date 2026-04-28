import { BadRequestException, Injectable } from '@nestjs/common';
import { GroomerDto } from './dto/groomer.dto';
import { UpdateGroomerDto } from './dto/groomer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Groomer } from './entities/groomer.entity';

@Injectable()
export class GroomersService {
  constructor(
    @InjectRepository(Groomer)
    private readonly groomersRepository: Repository<Groomer>,
  ) {}
  async create(createGroomerDto: GroomerDto) {
    const [existingGroomerByCedula, existingGroomerByEmail] = await Promise.all(
      [
        this.groomersRepository.findOne({
          where: { cedula: createGroomerDto.cedula },
        }),
        this.groomersRepository.findOne({
          where: { email: createGroomerDto.email },
        }),
      ],
    );
    if (existingGroomerByCedula) {
      throw new BadRequestException(
        `La cédula ${createGroomerDto.cedula} ya está registrada`,
      );
    }
    if (existingGroomerByEmail) {
      throw new BadRequestException(
        `El email ${createGroomerDto.email} ya está registrado`,
      );
    }
    const groomer = this.groomersRepository.create(createGroomerDto);
    return await this.groomersRepository.save(groomer);
  }

  findAll() {
    return `This action returns all groomers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groomer`;
  }

  update(id: number, updateGroomerDto: UpdateGroomerDto) {
    return `This action updates a #${id} groomer`;
  }

  remove(id: number) {
    return `This action removes a #${id} groomer`;
  }
}
