import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ActivitiesService, PrismaService],
  controllers: [ActivitiesController],
})
export class ActivitiesModule {}
