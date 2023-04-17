import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 50)
  title: string;

  @ApiProperty()
  @IsString({ message: 'Description must be a string' })
  @Length(3, 255, { message: 'Minimum 3 - Maximum 255 characters allowed' })
  description: string;

  @ApiProperty()
  @IsNumber({ allowNaN: false })
  @Min(0)
  @Max(100)
  @IsNotEmpty({ message: 'Stock is required' })
  stock: number;

  @ApiProperty()
  @IsNumber({ allowNaN: false })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;
}
