import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  thaiFirstName?: string;

  @ApiProperty()
  @IsString()
  thaiLastName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty()
  @IsString()
  gender?: string;

  @ApiProperty()
  @IsString()
  group?: string;

  @ApiProperty()
  @IsString()
  position?: string;

  @ApiProperty()
  @IsString()
  directSuperior?: string;

  @ApiProperty()
  @IsString()
  location?: string;

  @ApiProperty()
  @IsString()
  dealership?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid phone number.' })
  phone: string;
}
