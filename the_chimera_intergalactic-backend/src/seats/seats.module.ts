import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { ShipsModule } from '../ships/ships.module';

@Module({
  imports: [PrismaModule, ShipsModule],
  controllers: [SeatsController],
  providers: [SeatsService],
  exports: [SeatsService],
})
export class SeatsModule {}
