import gql from 'graphql-tag';

export interface CreateUserInput {
  email: string;
  password: string;
}

export const CreateUserInputSchema = gql`
input CreateUserInput {
  email: String!
  password: String!
}
`;
