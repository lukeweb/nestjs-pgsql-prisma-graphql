import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => String, { description: 'User id in database' })
  id: string;

  @Field(() => String, { description: 'Email used for authentication' })
  email: string;

  @Field(() => String, { description: 'Password used for authentication' })
  password: string;

  @Field(() => Boolean, { description: 'Indicates if user is active' })
  active: boolean;

  @Field(() => String, { description: 'User name', nullable: true })
  name?: string;

  @Field(() => String, { description: 'User last name', nullable: true })
  lastName?: string;

  @Field(() => String, {
    description: 'City that is declared by user',
    nullable: true,
  })
  city?: string;

  @Field(() => String, {
    description: 'Postal code of city declared by user',
    nullable: true,
  })
  postalCode?: string;

  @Field(() => Role, {
    nullable: false,
  })
  role: Role;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
