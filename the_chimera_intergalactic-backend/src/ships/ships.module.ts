import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';

@Module({
  imports: [PrismaModule, UtilitiesModule],
  controllers: [ShipsController],
  providers: [ShipsService],
  exports: [ShipsService],
})
export class ShipsModule {}
