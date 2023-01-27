import { gql } from '@apollo/client';


export const GET_ALL_SYSTEM_PARAMS = gql`
query GetAllSystemParams {
  getAllSystemParams {
    _id
    key
    value
    variable
    active
    created_at
    updated_at
  }
}
`

export const  GET_SYSTEM_PARAMS = gql`
query GetSystemParams($input: getSystemParamsInput) {
  getSystemParams(input: $input) {
    _id
    key
    value
    variable
    active
    created_at
    updated_at
  }
}
`

export const  CREATE_SYSTEM_PARAMS = gql`
mutation CreateSystemParams($input: createSystemParamsInput) {
  createSystemParams(input: $input) {
    _id
    key
    value
    variable
    active
    created_at
    updated_at
  }
}
`

export const  UPDATE_SYSTEM_PARAMS = gql`
mutation UpdateSystemParams($input: updateSystemParamsInput) {
  updateSystemParams(input: $input) {
    _id
    key
    value
    variable
    active
    created_at
    updated_at
  }
}
`

export const  DELETE_SYSTEM_PARAMS = gql`
mutation DeleteSystemParams($input: getSystemParamsInput) {
  deleteSystemParams(input: $input) {
    _id
    key
    value
    variable
    active
    created_at
    updated_at
  }
}
`