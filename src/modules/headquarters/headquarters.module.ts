import { Module } from '@nestjs/common';
import { HeadquartersService } from './headquarters.service';
import { HeadquartersController } from './headquarters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Headquarters } from './entities/headquarters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Headquarters])],
  controllers: [HeadquartersController],
  providers: [HeadquartersService],
})
export class HeadquartersModule {}
