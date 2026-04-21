import { Injectable, NotFoundException } from '@nestjs/common';
import { PetDto } from './dto/pet.dto';
import { UpdatePetDto } from './dto/pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}
  async create(createPetDto: PetDto) {
    const [customer] = await Promise.all([
      this.customerRepository.findOne({
        where: { id_cliente: createPetDto.id_cliente },
      }),
    ]);
    if (!customer) {
      throw new NotFoundException(
        `El cliente con id ${createPetDto.id_cliente} no existe`,
      );
    }
    const newPet = this.petRepository.create({
      nombre: createPetDto.nombre,
      raza: createPetDto.raza,
      edad: createPetDto.edad,
      edad_unidad: createPetDto.edad_unidad,
      cliente: customer,
    });
    return await this.petRepository.save(newPet);
  }

  findAll() {
    return `This action returns all pets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
