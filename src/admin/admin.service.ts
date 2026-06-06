import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async register(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { username, email, password } = createAdminDto;

    const existingAdmin = await this.adminRepository.findOne({ where: [{ email }, { username }] });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return await this.adminRepository.save(admin);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload = { sub: admin.id, username: admin.username };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
