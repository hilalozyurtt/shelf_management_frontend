import { gql } from '@apollo/client';


export const GET_ALL_SYSTEM_PARAMS = gql`
query GetAllSystemParams {
  getAllSystemParams {
    _id
    key
    value
    variable
    table
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
export const GET_SYSTEM_PARAMS_BY_TABLE = gql`
  query GetSystemParamsByTable($input: getSystemParamsByTableInput) {
    getSystemParamsByTable(input: $input) {
      variable
    }
  }
`

export const GET_SYSTEM_PARAM_BY_VARIABLE = gql`
query GetSystemParamsByValue($input: getSystemParamsByValueInput) {
  getSystemParamsByValue(input: $input) {
    _id
    key
    value
    table
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
    table
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
    table
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
    table
    active
    created_at
    updated_at
  }
}
`