import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';
import { UpdateCustomerDto } from './dto/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CustomerDto) {
    const [existingCustomerByCedula, existingCustomerByEmail] =
      await Promise.all([
        this.customerRepository.findOne({
          where: { cedula: createCustomerDto.cedula },
        }),
        this.customerRepository.findOne({
          where: { email: createCustomerDto.email },
        }),
      ]);
    if (existingCustomerByCedula) {
      throw new BadRequestException(
        `La cédula ${createCustomerDto.cedula} ya está registrada`,
      );
    }
    if (existingCustomerByEmail) {
      throw new BadRequestException(
        `El email ${createCustomerDto.email} ya está registrado`,
      );
    }
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
