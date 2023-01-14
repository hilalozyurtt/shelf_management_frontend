//@ts-ignore
import { gql } from '@apollo/client';

export const STRUCTURE_LIST = gql`
query GetAllStructures {
  getAllStructures {
    _id
    bina_no
    active
    created_at
    updated_at
  }
}
`
export const DELETE_STRUCTURE = gql`
mutation DeleteStructure($input: deleteStructureInput!) {
  deleteStructure(input: $input) {
    _id
    bina_no
    active
    created_at
    updated_at
  }
}`

export const UPDATE_STRUCTURE = gql`
mutation UpdateStructure($input: updateStructureInput!) {
  updateStructure(input: $input) {
    _id
    bina_no
    active
    created_at
    updated_at
  }
}
`
export const GET_STRUCTURE = gql`
query GetStructure($input: getStructureInput!) {
  getStructure(input: $input) {
    _id
    bina_no
    active
    created_at
    updated_at
  }
}
`

export const CREATE_STRUCTURE = gql`
mutation CreateStructure($input: createStructureInput!) {
  createStructure(input: $input) {
    _id
    bina_no
    active
    created_at
    updated_at
  }
}
`