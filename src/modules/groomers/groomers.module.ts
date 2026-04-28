import { Module } from '@nestjs/common';
import { GroomersService } from './groomers.service';
import { GroomersController } from './groomers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groomer } from './entities/groomer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Groomer])],
  controllers: [GroomersController],
  providers: [GroomersService],
})
export class GroomersModule {}
