import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User as UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthGuard } from '../auth/guard/auth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserEntity], { name: 'users' })
  @UseGuards(AuthGuard)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => UserEntity, { name: 'user' })
  @UseGuards(AuthGuard)
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Partial<User>> {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserEntity)
  @UseGuards(AuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    if (!updateUserInput.id) {
      throw new BadRequestException('User id is required');
    }

    updateUserInput.updatedAt = new Date();

    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserEntity)
  @UseGuards(AuthGuard)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }
}
