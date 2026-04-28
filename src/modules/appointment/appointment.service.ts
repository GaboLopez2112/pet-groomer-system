import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppointmentDto } from './dto/appointment.dto';
import { UpdateAppointmentDto } from './dto/appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { Pet } from '../pets/entities/pet.entity';
import { Service } from '../services/entities/service.entity';
import { Groomer } from '../groomers/entities/groomer.entity';
import { Headquarters } from '../headquarters/entities/headquarters.entity';
import { AppointmentStatus } from '../../communs/enums/enums';
import { FilterAppointmentDto } from './dto/filter-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Groomer)
    private readonly groomerRepository: Repository<Groomer>,
    @InjectRepository(Headquarters)
    private readonly headquarterRepository: Repository<Headquarters>,
  ) {}
  async create(createAppointmentDto: AppointmentDto) {
    const pet = await this.petRepository.findOne({
      where: { id_mascota: createAppointmentDto.id_mascota },
    });

    if (!pet) {
      throw new NotFoundException(
        `La mascota con ID ${createAppointmentDto.id_mascota} no existe`,
      );
    }
    const service = await this.serviceRepository.findOne({
      where: { id_servicio: createAppointmentDto.id_servicio },
    });

    if (!service) {
      throw new NotFoundException(
        `El servicio con ID ${createAppointmentDto.id_servicio} no existe`,
      );
    }

    const groomer = await this.groomerRepository.findOne({
      where: { id_peluquero: createAppointmentDto.id_peluquero },
    });

    if (!groomer) {
      throw new NotFoundException(
        `El peluquero con ID ${createAppointmentDto.id_peluquero} no existe`,
      );
    }

    const headquarter = await this.headquarterRepository.findOne({
      where: { id_sucursal: createAppointmentDto.id_sucursal },
    });

    if (!headquarter) {
      throw new NotFoundException(
        `La sucursal con ID ${createAppointmentDto.id_sucursal} no existe`,
      );
    }

    if (!headquarter.activo) {
      throw new ConflictException(
        `La sucursal ${headquarter.nombre} no está activa actualmente`,
      );
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(createAppointmentDto.fecha)) {
      throw new BadRequestException('La fecha debe tener formato YYYY-MM-DD');
    }

    const horaRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!horaRegex.test(createAppointmentDto.hora)) {
      throw new BadRequestException('La hora debe tener formato HH:MM:SS');
    }
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        fecha: createAppointmentDto.fecha,
        hora: createAppointmentDto.hora,
        headquarter: { id_sucursal: createAppointmentDto.id_sucursal },
      },
    });

    if (existingAppointment) {
      throw new ConflictException(
        `Ya existe una cita programada en la sucursal ${headquarter.nombre} 
        el día ${createAppointmentDto.fecha} a las ${createAppointmentDto.hora}`,
      );
    }

    const groomerAppointment = await this.appointmentRepository.findOne({
      where: {
        fecha: createAppointmentDto.fecha,
        hora: createAppointmentDto.hora,
        peluquero: { id_peluquero: createAppointmentDto.id_peluquero },
      },
    });

    if (groomerAppointment) {
      throw new ConflictException(
        `El peluquero ${groomer.nombre} ya tiene una cita programada 
        el día ${createAppointmentDto.fecha} a las ${createAppointmentDto.hora}`,
      );
    }

    const appointment = this.appointmentRepository.create({
      mascota: pet,
      servicio: service,
      peluquero: groomer,
      headquarter: headquarter,
      fecha: createAppointmentDto.fecha,
      hora: createAppointmentDto.hora,
      estado: createAppointmentDto.estado || AppointmentStatus.PENDING,
    });

    const savedAppointment = await this.appointmentRepository.save(appointment);

    return await this.appointmentRepository.findOne({
      where: { id_cita: savedAppointment.id_cita },
      relations: ['mascota', 'servicio', 'peluquero', 'headquarter'],
    });
  }
  async findAllWithFilters(
    filters: FilterAppointmentDto,
  ): Promise<Appointment[]> {
    const query = this.appointmentRepository
      .createQueryBuilder('cita')
      .leftJoinAndSelect('cita.mascota', 'mascota')
      .leftJoinAndSelect('cita.servicio', 'servicio')
      .leftJoinAndSelect('cita.peluquero', 'peluquero')
      .leftJoinAndSelect('cita.headquarter', 'headquarter');

    if (filters.fecha) {
      query.andWhere('cita.fecha = :fecha', { fecha: filters.fecha });
    }

    if (filters.sucursal) {
      query.andWhere('cita.id_sucursal = :sucursal', {
        sucursal: filters.sucursal,
      });
    }

    query.orderBy('cita.hora', 'ASC');

    return await query.getMany();
  }

  findAll() {
    return `This action returns all appointment`;
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id_cita: id },
      relations: ['mascota', 'servicio', 'peluquero', 'headquarter'],
    });

    if (!appointment) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);

    // Validar que la nueva mascota existe
    if (updateAppointmentDto.id_mascota) {
      const pet = await this.petRepository.findOne({
        where: { id_mascota: updateAppointmentDto.id_mascota },
      });
      if (!pet) {
        throw new NotFoundException('La nueva mascota no existe');
      }
      // ✅ Asignar la entidad completa, no solo el ID
      appointment.mascota = pet;
    }

    // Validar nuevo servicio
    if (updateAppointmentDto.id_servicio) {
      const service = await this.serviceRepository.findOne({
        where: { id_servicio: updateAppointmentDto.id_servicio },
      });
      if (!service) {
        throw new NotFoundException('El nuevo servicio no existe');
      }
      appointment.servicio = service;
    }

    // Validar nuevo peluquero
    if (updateAppointmentDto.id_peluquero) {
      const groomer = await this.groomerRepository.findOne({
        where: { id_peluquero: updateAppointmentDto.id_peluquero },
      });
      if (!groomer) {
        throw new NotFoundException('El nuevo peluquero no existe');
      }
      appointment.peluquero = groomer;
    }

    // Validar nueva sucursal
    if (updateAppointmentDto.id_sucursal) {
      const headquarter = await this.headquarterRepository.findOne({
        where: { id_sucursal: updateAppointmentDto.id_sucursal },
      });
      if (!headquarter) {
        throw new NotFoundException('La nueva sucursal no existe');
      }
      if (!headquarter.activo) {
        throw new ConflictException('La nueva sucursal no está activa');
      }
      appointment.headquarter = headquarter;
    }

    // Actualizar fecha, hora, estado (campos simples)
    if (updateAppointmentDto.fecha)
      appointment.fecha = updateAppointmentDto.fecha;
    if (updateAppointmentDto.hora) appointment.hora = updateAppointmentDto.hora;
    if (updateAppointmentDto.estado)
      appointment.estado = updateAppointmentDto.estado;

    // Validar conflicto de horario
    if (
      updateAppointmentDto.fecha ||
      updateAppointmentDto.hora ||
      updateAppointmentDto.id_sucursal
    ) {
      const nuevaFecha = updateAppointmentDto.fecha || appointment.fecha;
      const nuevaHora = updateAppointmentDto.hora || appointment.hora;
      const nuevaSucursal =
        updateAppointmentDto.id_sucursal || appointment.headquarter.id_sucursal;

      const existingAppointment = await this.appointmentRepository
        .createQueryBuilder('cita')
        .where('cita.fecha = :fecha', { fecha: nuevaFecha })
        .andWhere('cita.hora = :hora', { hora: nuevaHora })
        .andWhere('cita.id_sucursal = :sucursal', { sucursal: nuevaSucursal })
        .andWhere('cita.id_cita != :id', { id: id })
        .getOne();

      if (existingAppointment) {
        throw new ConflictException(
          'Ya existe una cita en ese horario y sucursal',
        );
      }
    }

    // Guardar
    return await this.appointmentRepository.save(appointment);
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
