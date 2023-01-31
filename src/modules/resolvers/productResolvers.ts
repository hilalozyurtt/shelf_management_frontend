import { gql } from '@apollo/client'

export const GET_ALL_PRODUCTS = gql`
query GetAllProducts {
  getAllProducts {
    _id
    shelf_id
    raf_no
    structure_id
    bina_no
    name
    arac
    ozellik
    ozellik2
    oem_no
    orjinal_no
    active
    created_at
    updated_at
  }
}
`

export const GET_PRODUCT = gql`
  query GetProduct($input: getProductInput!) {
    getProduct(input: $input) {
      _id
      shelf_id
      raf_no
      structure_id
      bina_no
      name
      arac
      ozellik
      ozellik2
      oem_no
      orjinal_no
      active
      created_at
      updated_at
    }
  }
`

export const CREATE_PRODUCT = gql`
    mutation CreateProduct($input: createProductInput!) {
        createProduct(input: $input) {
            _id
            shelf_id
            structure_id
            bina_no
            raf_no
            name
            arac
            ozellik
            ozellik2
            oem_no
            orjinal_no
            active
            created_at
            updated_at
        }
    }
`

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($input: deleteInput!) {
  deleteProduct(input: $input) {
    _id
    shelf_id
    raf_no
    structure_id
    bina_no
    name
    arac
    ozellik
    ozellik2
    oem_no
    orjinal_no
    active
    created_at
    updated_at
  }
}
`
export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($input: updateProductInput!) {
  updateProduct(input: $input) {
    _id
    shelf_id
    raf_no
    structure_id
    bina_no
    name
    arac
    ozellik
    ozellik2
    oem_no
    orjinal_no
    active
    created_at
    updated_at
  }
}
`