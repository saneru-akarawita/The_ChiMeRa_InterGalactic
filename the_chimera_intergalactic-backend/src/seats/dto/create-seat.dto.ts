import { SeatType } from "@prisma/client";
import {IsEnum, IsNumber, IsString} from "class-validator";
export class CreateSeatDto{

    @IsEnum(SeatType)
    readonly seat_type:SeatType

    @IsString()
    readonly ship_id:string

    @IsNumber()
    readonly num_of_seats:number
}