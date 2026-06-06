import { IsEmail, IsNotEmpty, IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Computer Science' })
  @IsNotEmpty()
  department: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Max(8)
  @Type(() => Number)
  semester: number;
}

export class UpdateStudentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  department?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(8)
  @Type(() => Number)
  semester?: number;
}
