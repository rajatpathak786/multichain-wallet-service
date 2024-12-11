import {
    IsString,
    IsNotEmpty,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateUserDto {
    @ApiProperty({
      description: `User Name Required and must be unique`,
      example: `username@123`,
      required: true,
    })
    @IsString()
    @IsNotEmpty()
    userName: string;
  
    @ApiProperty({
      description: `First Name Required`,
      example: `First Name`,
      required: true,
    })
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @ApiProperty({
      description: `Last Name Required`,
      example: `Last Name`,
      required: true,
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;
  }