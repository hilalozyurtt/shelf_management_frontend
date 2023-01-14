import { gql } from '@apollo/client'

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