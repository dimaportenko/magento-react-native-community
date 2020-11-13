/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($id: String!, $pageSize: Int!, $currentPage: Int!) {
    products(
      filter: { category_id: { eq: $id } }
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      items {
        id
        name
        small_image {
          url
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
      }
    }
  }
`;

export type GetCategoryProductsType = {
  products: {
    total_count: number,
    items: Array<ProductType>,
  },
};

export type ProductType = {
  id: number,
  name: string,
  small_image: {
    url: string,
  },
  price_range: {
    minimum_price: {
      final_price: {
        currency: string,
        value: number,
      },
    },
  },
};
