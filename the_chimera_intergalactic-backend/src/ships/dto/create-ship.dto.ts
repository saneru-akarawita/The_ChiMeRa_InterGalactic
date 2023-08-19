import {IsArray, IsNumber, IsString, Length, ValidateNested} from "class-validator";
import {HasMimeType, IsFile, MaxFileSize, MemoryStoredFile} from "nestjs-form-data";
import {Type} from "class-transformer";
import {CreateSeatDto} from "../../seats/dto/create-seat.dto";
import {CreatSeatOnShip} from "../../seats/dto/creat-seat-on-ship";

export class CreateShipDto {
    @IsString()
    readonly name:string;

    @IsString()
    readonly model:string;

    @IsString()
    @Length(8,8)
    readonly identifier:string;

    @IsNumber()
    readonly speed:number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatSeatOnShip)
    seats:CreatSeatOnShip[];


    @IsFile()
    @MaxFileSize(1e7)
    @HasMimeType(['image/jpeg', 'image/png'])
    readonly ship_picture: MemoryStoredFile;
}