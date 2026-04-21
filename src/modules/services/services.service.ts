import { ConflictException, Injectable } from '@nestjs/common';
import { ServiceDto } from './dto/service.dto';
import { UpdateServiceDto } from './dto/service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}
  async create(createServiceDto: ServiceDto) {
    const serviceExiste = await this.serviceRepository.findOne({
      where: { nombre: createServiceDto.nombre },
    });
    if (serviceExiste) {
      throw new ConflictException('Servicio ya existe');
    }
    const service = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(service);
  }

  findAll() {
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
