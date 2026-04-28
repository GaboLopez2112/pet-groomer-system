import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HeadquartersService } from './headquarters.service';
import { HeadquartersDto } from './dto/headquarters.dto';
import { UpdateHeadquartersDto } from './dto/headquarters.dto';

@Controller('headquarters')
export class HeadquartersController {
  constructor(private readonly headquartersService: HeadquartersService) {}

  @Post('nuevaSucursal')
  create(@Body() createHeadquartersDto: HeadquartersDto) {
    return this.headquartersService.create(createHeadquartersDto);
  }

  @Get()
  findAll() {
    return this.headquartersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headquartersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHeadquartersDto: UpdateHeadquartersDto,
  ) {
    return this.headquartersService.update(+id, updateHeadquartersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headquartersService.remove(+id);
  }
}
