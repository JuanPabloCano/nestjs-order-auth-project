import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UserRegisterDto {
  @ApiProperty()
  @IsString({ message: 'Full name is required' })
  @IsNotEmpty()
  @Length(6, 100)
  fullName: string;

  @ApiProperty()
  @IsString({ message: 'Document is required' })
  @IsNotEmpty()
  document: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(18, { message: 'Minimum required age is 10' })
  @Max(90)
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 15, {
    message: 'Please enter a password between 8 and 10 characters',
  })
  password: string;
}
