import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@lib/enum';

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
    description: `User Role - User | Admin`,
    example: UserRole.User,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

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
