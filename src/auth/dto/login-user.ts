import { CreateUserInput } from '../../user/dto/create-user.input';
import { InputType, Field, PartialType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class LoginUserOutput {
  @Field(() => String)
  accessToken: string;
}
