import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UtilitiesModule } from 'src/utilities/utilities.module';

@Module({
  imports: [PrismaModule, UtilitiesModule],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
