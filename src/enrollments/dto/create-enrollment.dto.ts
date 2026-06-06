import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrollmentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  courseId: number;
}
