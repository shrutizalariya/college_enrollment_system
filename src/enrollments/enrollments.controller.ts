import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Enroll a student in a course' })
  @ApiResponse({ status: 201, description: 'Enrolled successfully' })
  @ApiResponse({ status: 400, description: 'BadRequest - Course full' })
  @ApiResponse({ status: 409, description: 'Conflict - Already enrolled' })
  enroll(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.enroll(createEnrollmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get('student/:id')
  @ApiOperation({ summary: 'Get enrollments for a specific student' })
  findByStudent(@Param('id') id: string) {
    return this.enrollmentsService.findByStudent(+id);
  }

  @Get('course/:id')
  @ApiOperation({ summary: 'Get enrollments for a specific course' })
  findByCourse(@Param('id') id: string) {
    return this.enrollmentsService.findByCourse(+id);
  }
}
