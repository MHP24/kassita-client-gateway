import { IsBase64, IsPositive, IsString } from 'class-validator';

export class FileDto {
  @IsString()
  fieldname: string;

  @IsString()
  encoding: string;

  @IsString()
  originalname: string;

  @IsString()
  mimetype: string;

  @IsBase64()
  buffer: Buffer;

  @IsPositive()
  size: number;
}
