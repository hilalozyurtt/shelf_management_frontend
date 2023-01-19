import { gql } from "@apollo/client";

export const CHECK_TOKEN = gql`
query CheckToken {
  checkToken {
    _id
    username
    usersurname
    email
    phone
    role
  }
}
`

export const LOGOUT = gql`
query Query {
  logout
}
`

export const GET_USER = gql`
query Query($userId: ID!) {
  user(id: $userId) {
    _id
    username
    usersurname
    email
    phone
    role
  }
}
`
export const REGISTER_USER = gql`
mutation RegisterUser($input: RegisterInput) {
  registerUser(input: $input) {
    _id
    username
    usersurname
    email
    phone
    role
    password
    token
  }
}
`

export const LOGIN_USER = gql`
mutation LoginUser($input: LoginInput) {
  loginUser(input: $input) {
    _id
    username
    usersurname
    email
    phone
    role
    password
    token
  }
}
`