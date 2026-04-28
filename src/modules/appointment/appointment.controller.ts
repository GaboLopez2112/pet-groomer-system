import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './dto/appointment.dto';
import { UpdateAppointmentDto } from './dto/appointment.dto';
import { FilterAppointmentDto } from './dto/filter-appointment.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Appointment } from './entities/appointment.entity';
@ApiTags('citas')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('nuevaCita')
  create(@Body() createAppointmentDto: AppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }
  @Get()
  @ApiOperation({
    summary: 'Listar citas con filtros (US05)',
  })
  @ApiQuery({ name: 'fecha', required: false, example: '2026-05-20' })
  @ApiQuery({ name: 'sucursal', required: false, example: 'uuid' })
  async findAllFilter(
    @Query() filters: FilterAppointmentDto,
  ): Promise<Appointment[]> {
    return await this.appointmentService.findAllWithFilters(filters);
  }

  /*@Get()
  findAll() {
    return this.appointmentService.findAll();
  }*/

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
