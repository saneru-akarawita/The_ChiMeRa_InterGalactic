import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from './auth/auth.module';
import { PackagesModule } from './packages/packages.module';
import { LocationsModule } from './locations/locations.module';
import { BookingsModule } from './bookings/bookings.module';
import { ShipsModule } from './ships/ships.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ShipsModule,
    NestjsFormDataModule.config({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    ActivitiesModule,
    AuthModule,
    LocationsModule,
    PackagesModule,
    BookingsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
