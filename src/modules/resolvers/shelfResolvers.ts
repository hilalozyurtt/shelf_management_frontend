//@ts-ignore
import { gql } from '@apollo/client';

export const GET_SHELF = gql`
    query GetShelf($input: getShelfInput!) {
        getShelf(input: $input) {
        _id
        raf_no
        bina_no
        structure_id
        active
        created_at
        updated_at
        }
    }
`

export const GET_ALL_SHELFS = gql`
    query GetAllShelfs {
        getAllShelfs {
        _id
        raf_no
        bina_no
        structure_id
        active
        created_at
        updated_at
        }
    }
`

export const CREATE_SHELF = gql`
    mutation CreateShelf($input: createShelfInput!) {
        createShelf(input: $input) {
        _id
        raf_no
        bina_no
        structure_id
        active
        created_at
        updated_at
        }
    }
`

export const UPDATE_SHELF = gql`
    mutation UpdateShelf($input: updateShelfInput!) {
        updateShelf(input: $input) {
        _id
        raf_no
        bina_no
        structure_id
        active
        created_at
        updated_at
        }
    }
`

export const DELETE_SHELF = gql`
    mutation DeleteShelf($input: getShelfInput!) {
        deleteShelf(input: $input) {
        _id
        raf_no
        bina_no
        structure_id
        active
        created_at
        updated_at
        }
    }
`
