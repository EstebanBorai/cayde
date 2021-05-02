import gql from 'graphql-tag';

export default gql`
type User {
  id: ID!
  email: String!
}
`;
