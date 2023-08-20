import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SeatsController],
  providers: [SeatsService],
  exports: [SeatsService],
})
export class SeatsModule {}
