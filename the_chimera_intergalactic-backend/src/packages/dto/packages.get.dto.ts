import { IsNotEmpty, IsString } from 'class-validator';

export class PackageGetByLocationDto {
  @IsString()
  @IsNotEmpty({
    message: 'Location is required',
  })
  readonly location_id: string;
}

export class PackageGetSingleDto {
  @IsString()
  @IsNotEmpty({
    message: 'Package id is required',
  })
  readonly package_id: string;
}
