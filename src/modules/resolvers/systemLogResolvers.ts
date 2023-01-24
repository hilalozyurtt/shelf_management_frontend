//@ts-ignore
import { gql } from '@apollo/client';

export const GET_ALL_SYSTEM_LOGS = gql`
  query GetAllSystemLogs {
    getAllSystemLogs {
      _id
      user_id
      user_name
      changed_value
      changed_id
      action
      created_at
    }
  }
`