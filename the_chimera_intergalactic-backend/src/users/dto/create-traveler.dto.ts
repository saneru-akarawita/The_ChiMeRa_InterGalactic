import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsIn,
} from 'class-validator';
import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { IsEmailUnique, MatchAgainstSibling } from 'src/validators';

export class CreateTravelerDto {
  @IsEmailUnique({ message: 'Email already exists' })
  @IsEmail()
  readonly email: string;

  @MaxLength(12)
  @MinLength(8)
  @IsString()
  readonly password: string;

  @MatchAgainstSibling(CreateTravelerDto, (dto) => dto.password, {
    message: 'Passwords do not match',
  })
  readonly confirm_password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsDateString()
  @IsString()
  readonly dob: string;

  @IsNotEmpty()
  @IsString()
  readonly galaxy: string;

  @IsNotEmpty()
  @IsString()
  readonly planet: string;

  @IsFile()
  @MaxFileSize(1e7)
  @HasMimeType(['image/jpeg', 'image/png'])
  readonly profile_picture: MemoryStoredFile;

  @IsIn(['true'])
  readonly terms: boolean;
}
