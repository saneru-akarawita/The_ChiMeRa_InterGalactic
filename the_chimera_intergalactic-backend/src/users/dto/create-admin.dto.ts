import { IsEmail, IsString, MinLength, MaxLength, } from 'class-validator';
import { IsEmailUnique, MatchAgainstSibling } from 'src/validators'

export class CreateAdminDto {

    @IsEmailUnique({ message: "Email already exists" })
    @IsEmail()
    readonly email: string;

    @MaxLength(12)
    @MinLength(8)
    @IsString()
    readonly password: string;


    @MatchAgainstSibling(CreateAdminDto, (dto) => dto.password, { message: "Passwords do not match" })
    readonly confirm_password: string;
}
