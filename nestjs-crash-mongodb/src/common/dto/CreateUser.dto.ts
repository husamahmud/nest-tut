import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserSettingsDto } from '@/common/dto/CreateUserSettings.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @ValidateNested()
  @IsOptional()
  settings?: CreateUserSettingsDto;
}
