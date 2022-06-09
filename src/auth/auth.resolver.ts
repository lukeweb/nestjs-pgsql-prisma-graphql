import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput, LoginUserOutput } from './dto/login-user';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginUserOutput)
  loginUser(
    @Args('input', { type: () => LoginUserInput }) input: LoginUserInput,
  ): Promise<LoginUserOutput> {
    return this.authService.login(input);
  }
}
