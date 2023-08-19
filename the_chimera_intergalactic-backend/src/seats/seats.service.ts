import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service"
import {CreateSeatDto} from "./dto/create-seat.dto";

@Injectable()
export class SeatsService{
    constructor() {
    }
}