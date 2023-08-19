import { Module } from '@nestjs/common';
import { PackageController } from './packages.controller';
import { PackageService } from './packages.service';

@Module({
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackagesModule {}
