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

  createAdmin(createAdminDto: CreateAdminDto) {
    throw new Error('Method not implemented.');
  }

  async createTraveler(createTravelerDto: CreateTravelerDto) {

    const { dob, email, galaxy, name, password, confirm_password, planet, profile_picture, terms } = createTravelerDto

    if (password !== confirm_password) {
      throw new BadRequestException(
        {
          message: ["Password and Confirm Password must match"],
          error: "Bad Request",
          statusCode: 400
        })
    }

    if (!terms) {
      throw new BadRequestException("You must agree to Terms and conditions")
    }

    const hashedPassword = await hash(password, 12);
    const generated_dob = new Date(dob);

    console.log(profile_picture.originalName)


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
}
