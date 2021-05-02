import gql from 'graphql-tag';

export interface UpdateUserInput {
  id: string;
  password?: string;
  repeatPassword?: string;
}

export const UpdateUserInputSchema = gql`
input UpdateUserInput {
  password: String
  repeatPassword: String
}
`;
