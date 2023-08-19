import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from './auth/auth.module';
import { PackageModule } from './packages/package.module';

@Module({
<<<<<<< HEAD
  imports: [
    PrismaModule,
    UsersModule,
    NestjsFormDataModule.config({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    ActivitiesModule,
    AuthModule,
  ],
=======
  imports: [PrismaModule, UsersModule, NestjsFormDataModule.config({isGlobal: true}), ConfigModule.forRoot({ isGlobal: true }), ActivitiesModule, AuthModule, PackageModule],
>>>>>>> 86ac510 (Feature: add package creation path with a dto)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
