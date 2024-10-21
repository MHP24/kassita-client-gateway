import { Type } from 'class-transformer';
import { FileDto } from './file-dto';
import { IsArray, ValidateNested } from 'class-validator';

export class UploadedFilesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files: FileDto[];
}
