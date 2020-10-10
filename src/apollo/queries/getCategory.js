/**
 * @noflow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories($id: String!) {
    categoryList(filters: { ids: { eq: $id } }) {
      id
      children {
        id
        name
        product_count
        children_count
      }
    }
  }
`;
