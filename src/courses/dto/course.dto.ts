import { IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to Computer Science' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Learn basic programming concepts' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 50 })
  @IsInt()
  @Min(1)
  maxCapacity: number;
}

export class UpdateCourseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  maxCapacity?: number;
}
