import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 3306,
        username: configService.get<string>('DB_USER') || 'root',
        password: configService.get<string>('DB_PASSWORD') || 'root',
        database: configService.get<string>('DB_NAME') || 'college_enrollment',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    AdminModule,
    StudentsModule,
    CoursesModule,
    EnrollmentsModule,
  ],
})
export class AppModule {}
