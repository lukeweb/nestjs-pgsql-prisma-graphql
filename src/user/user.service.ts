import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '@prisma/client';
import { createBcryptHash, generateUlidId } from '../utils/helpers';
import { merge } from 'lodash';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = await createBcryptHash(createUserInput.password);
    return this.prismaService.user.create({
      data: merge<CreateUserInput, { id: string }>(createUserInput, {
        id: generateUlidId(),
      }),
    });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findOne(id: string): Promise<Partial<User>> {
    return this.prismaService.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        city: true,
        postalCode: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      updateUserInput.password = await createBcryptHash(
        updateUserInput.password,
      );
    }

    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserInput,
    });
  }

  remove(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
