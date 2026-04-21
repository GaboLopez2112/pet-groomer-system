import { Module } from '@nestjs/common';
import { GroomersService } from './groomers.service';
import { GroomersController } from './groomers.controller';

@Module({
  controllers: [GroomersController],
  providers: [GroomersService],
})
export class GroomersModule {}
