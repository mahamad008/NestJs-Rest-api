import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Create a user
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      },
    });
  }

  // Get all users
  async findAll() {
    return this.prisma.user.findMany();
  }

  // Get a user by ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Update user by ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Delete a user by ID
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
