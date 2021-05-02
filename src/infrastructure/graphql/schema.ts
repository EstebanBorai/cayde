import merge from 'lodash/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

import * as UserSchema from '../../modules/user/infrastructure/graphql';

import type { GraphQLSchema } from 'graphql';

export default function makeGraphQLSchema(): GraphQLSchema {
  const typeDefs = UserSchema.typeDefs;
  const resolvers = merge(UserSchema.resolvers);

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
}
