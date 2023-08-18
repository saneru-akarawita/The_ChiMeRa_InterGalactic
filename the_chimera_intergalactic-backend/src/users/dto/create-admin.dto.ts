import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Min, Max } from 'class-validator';

export class CreateAdminDto {

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @MaxLength(12)
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    readonly password: string;

}
