import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './modules/customers/customers.module';
import { PetsModule } from './modules/pets/pets.module';
import { ServicesModule } from './modules/services/services.module';
import { GroomersModule } from './modules/groomers/groomers.module';
import { HeadquartersModule } from './modules/headquarters/headquarters.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5437,
      username: 'galopez',
      password: 'g#21/lopez',
      database: 'petgroomersystem',
      synchronize: false,
      autoLoadEntities: true,
    }),
    CustomersModule,
    PetsModule,
    ServicesModule,
    GroomersModule,
    HeadquartersModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
