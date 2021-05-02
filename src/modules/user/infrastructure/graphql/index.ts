import User from './type';
import { Schema, resolver } from './schema';
import { CreateUserInputSchema } from './create-user-input';
import { UpdateUserInputSchema } from './update-user-input';

export const typeDefs = [
  User,
  Schema,
  CreateUserInputSchema,
  UpdateUserInputSchema,
];

export const resolvers = resolver;
