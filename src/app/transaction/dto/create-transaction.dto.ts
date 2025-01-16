import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: `Key Hash`,
    example: `asdasdadeee.asdasd`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  keyHash: string;

  @ApiProperty({
    description: `Reciver Address`,
    example: `0xdE91efE7F3a50aCeBC09954d818F4eD40e68A2F1`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  recieverAddress: string;

  @ApiProperty({
    description: `Amount`,
    example: 1,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  amount: string;
}
