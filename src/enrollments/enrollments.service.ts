import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  async enroll(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    const { studentId, courseId } = createEnrollmentDto;

    // 1. Check if student exists
    await this.studentsService.findOne(studentId);

    // 2. Check if course exists
    const course = await this.coursesService.findOne(courseId);

    // 3. Prevent duplicate enrollment
    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: { studentId, courseId },
    });
    if (existingEnrollment) {
      throw new ConflictException('Student is already enrolled in this course');
    }

    // 4. Check course capacity
    const currentEnrollmentCount = await this.enrollmentRepository.count({
      where: { courseId },
    });
    if (currentEnrollmentCount >= course.maxCapacity) {
      throw new BadRequestException('Course has reached its maximum capacity');
    }

    // 5. Create enrollment
    const enrollment = this.enrollmentRepository.create({
      studentId,
      courseId,
    });

    return await this.enrollmentRepository.save(enrollment);
  }

  async findAll(): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({ relations: ['student', 'course'] });
  }

  async findByStudent(studentId: number): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      where: { studentId },
      relations: ['course'],
    });
  }

  async findByCourse(courseId: number): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      where: { courseId },
      relations: ['student'],
    });
  }
}
