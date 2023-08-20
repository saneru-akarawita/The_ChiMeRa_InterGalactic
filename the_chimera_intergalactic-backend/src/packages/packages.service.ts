import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PackageDto } from './dto/packages.dto';
import { DeletePackageDto } from './dto/packages.delete.dto';

@Injectable()
export class PackagesService {
  constructor(private readonly prisma: PrismaService) {}
  async createPackage(newPackage: PackageDto) {
    const {
      name,
      warp_drive,
      category,
      destinations,
      accomodation,
      price,
      activities,
      duration,
      location,
    } = newPackage;
    try {
      const createdPackage = await this.prisma.package.create({
        data: {
          name,
          warp_drive,
          category,
          destinations,
          accomodation,
          price,
          duration,
          location_id: location,
          PackageActivity: {
            create: activities.map((activity) => ({
              activity_id: activity,
            })),
          },
        },
      });
      return createdPackage;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async retrievePackagesByLocation(location_id: string) {
    try {
      const packages = await this.prisma.package.findMany({
        where: {
          location_id,
        },
        include: {
          PackageActivity: {
            include: {
              activity: true,
            },
          },
        },
      });
      return packages;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async retrieveSinglePackage(package_id: string) {
    try {
      const singlePackage = await this.prisma.package.findUnique({
        where: {
          id: package_id,
        },
        include: {
          PackageActivity: {
            include: {
              activity: true,
            },
          },
        },
      });
      return singlePackage;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deletePackage(deletePackage: DeletePackageDto) {
    const package_id = deletePackage.package_id;
    try {
      const deletedPackage = await this.prisma.package.deleteMany({
        where: {
          id: package_id,
        },
      });
      return deletedPackage;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
