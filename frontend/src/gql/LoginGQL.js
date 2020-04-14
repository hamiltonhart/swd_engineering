import { gql } from "apollo-boost";

export const LOGIN_MUT = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
