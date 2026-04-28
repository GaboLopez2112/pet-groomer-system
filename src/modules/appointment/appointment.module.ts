import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Service } from '../services/entities/service.entity';
import { Pet } from '../pets/entities/pet.entity';
import { Groomer } from '../groomers/entities/groomer.entity';
import { Headquarters } from '../headquarters/entities/headquarters.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Service,
      Pet,
      Groomer,
      Headquarters,
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
