import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsString({ message: 'Title must be a string' })
  @Length(3, 50)
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString({ message: 'Description must be a string' })
  @Length(3, 255, { message: 'Minimum 3 - Maximum 255 characters allowed' })
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber({ allowNaN: false })
  @Min(0)
  @Max(100)
  @IsOptional()
  stock?: number;

  @ApiProperty()
  @IsNumber({ allowNaN: false })
  @IsOptional()
  price?: number;
}
