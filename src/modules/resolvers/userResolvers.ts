import { gql } from "@apollo/client";

export const UPDATE_ST_USER = gql`
mutation UpdateUser($input: UpdateStInput) {
  updateUser(input: $input) {
    _id
    username
    usersurname
    phone
  }
}
`
export const UPDATE_ST_USER_PASSWORD = gql`
mutation UpdatePasswordSt($input: UpdatePasswordStInput) {
  updatePasswordSt(input: $input) {
    _id
    username
    usersurname
    phone
  }
}
`

export const CHECK_TOKEN = gql`
query CheckToken {
  checkToken {
    _id
    username
    usersurname
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
query User($input: getUserInput!) {
  user(input: $input) {
    _id
    username
    usersurname
    phone
  }
}
`
export const REGISTER_USER = gql`
mutation RegisterUser($input: RegisterInput) {
  registerUser(input: $input) {
    _id
    username
    usersurname
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
    phone
    role
    password
    token
  }
}
`