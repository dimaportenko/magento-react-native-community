/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';

export const GET_PRODUCT_CATEGORIES = gql`
  query GetCategoryProducts($id: String!, $pageSize: Int!, $currentPage: Int!) {
    products(
      filter: { category_id: { eq: $id } }
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
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

export type GetCategoryProductsType = {
  products: {
    items: Array<ProductType>,
  },
};
