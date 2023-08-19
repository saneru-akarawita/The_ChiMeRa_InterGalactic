import { Injectable, BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt'
import { FileUploaderService } from '../utilities/file-uploader.service'
import { PrismaService } from "../prisma/prisma.service"
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateTravelerDto } from './dto/create-traveler.dto';

@Injectable()
export class UsersService {


  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploader: FileUploaderService
  ) {

  }


  async createTraveler(createTravelerDto: CreateTravelerDto) {

    const { dob, email, galaxy, name, password, confirm_password, planet, profile_picture, terms } = createTravelerDto

    const hashedPassword = await hash(password, 12);
    const generated_dob = new Date(dob);

    const createdTraveler = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        traveler: {
          create: {
            dob: generated_dob,
            galaxy,
            name,
            planet,
            profile_pic: profile_picture.originalName,
          }
        }
      }
    });


    const profilePicURL = await this.fileUploader.uploadImage(profile_picture);

    if (profilePicURL) {
      return this.prisma.user.update({
        where: {
          id: createdTraveler.id,
        },
        data: {
          traveler: {
            update: {
              data: {
                profile_pic: profilePicURL
              }
            }
          }
        },
      });
    }
    else {
      return createdTraveler
    }
  }


  getTravelerByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
        user_type: 'TRAVELER'
      },
      include: {
        traveler: true,
      }
    })
  }


  async createAdmin(createAdminDto: CreateAdminDto) {

    const { email, password, confirm_password } = createAdminDto

    const hashedPassword = await hash(password, 12);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        user_type: 'ADMIN',
        admin: {
          create: {
          }
        }
      }
    });

  }

  
  getAdminByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
        user_type: 'ADMIN'
      },
      include: {
        admin: true,
      }
    })
  }

  findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return this.prisma.user.update({
      data: {
        refresh_token: refreshToken
      },
      where: {
        id: userId
      }
    })
  }
}
