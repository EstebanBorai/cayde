import gql from 'graphql-tag';

import UserMapper from '../mapper';

import type { UserPresentation } from '../mapper';
import type { Business } from '../../../../infrastructure/server/plugins/business';
import type { CreateUserInput } from './create-user-input';
import type { UpdateUserInput } from './update-user-input';

export const Schema = gql`
type Query {
  users: [User]!
}

type Mutation {
  createUser(user: CreateUserInput!): User
  updateUser(id: ID!, user: UpdateUserInput!): User
}
`;

export const resolver = {
  Mutation: {
    createUser: async (_parent, args: { user: CreateUserInput }, { business }: { business: Business }): Promise<UserPresentation> => {
      console.log(args);
      const created = await business.useCase.user.createUser.execute({
        email: args.user.email,
        password: args.user.password,
      });

      return UserMapper.intoPresentation(created);
    },
    updateUser: async (_parent, args: { user: UpdateUserInput }, { business }: { business: Business }): Promise<UserPresentation> => {
      const updated = await business.useCase.user.updateUser.execute({
        id: args.user.id,
        password: args.user.password,
        repeatPassword: args.user.repeatPassword,
      });

      return UserMapper.intoPresentation(updated);
    },
  },
  Query: {
    users: async (_parent, _args, { business }: { business: Business }): Promise<UserPresentation[]> => {
      const users = await business.useCase.user.findAll.execute();

      if (users.length === 0) {
        return [];
      }

      return users.map(UserMapper.intoPresentation);
    }
  },
}
