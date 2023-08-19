import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private readonly prisma: PrismaService) {}
  async createPackage() {
    return 'create package';
  }
  async retrievePackage() {
    return 'retrieve package';
  }
}
