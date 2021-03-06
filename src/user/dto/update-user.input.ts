import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;

  @Field(() => Boolean, { description: 'Indicates if user is active' })
  active: boolean;

  @Field(() => Date)
  updatedAt: Date;
}
