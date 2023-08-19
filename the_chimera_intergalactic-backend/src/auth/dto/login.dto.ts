import { IsBoolean, IsBooleanString, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { DoesAccoutnExist } from 'src/validators'

export class TravelerLoginDto {

    @DoesAccoutnExist('TRAVELER', { message: "Email is not associated with an intergalactic traveler account" })
    @IsEmail()
    readonly email: string;

    @MaxLength(12, { message: `Password doesn't match` })
    @MinLength(8, { message: `Password doesn't match` })
    @IsString()
    readonly password: string;


    @IsBoolean()
    readonly remember_me: boolean;
}


export class AdminLoginDto {

    @DoesAccoutnExist('ADMIN', { message: "Email is not associated with an intergalactic admin account" })
    @IsEmail()
    readonly email: string;

    @MaxLength(12, { message: `Password doesn't match` })
    @MinLength(8, { message: `Password doesn't match` })
    @IsString()
    readonly password: string;

    @IsBoolean()
    readonly remember_me: boolean;
}

