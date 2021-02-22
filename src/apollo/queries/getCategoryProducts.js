/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';
import { PRODUCT_PRICE_FRAGMENT } from './productPriceFragment';

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($id: String!, $pageSize: Int!, $currentPage: Int!) {
    products(filter: { category_id: { eq: $id } }, pageSize: $pageSize, currentPage: $currentPage) {
      total_count
      items {
        id
        name
        sku
        small_image {
          url
        }
        ...ProductPrice
      }
    }
  }
  ${PRODUCT_PRICE_FRAGMENT}
`;

export type GetCategoryProductsType = {
  products: {
    total_count: number,
    items: Array<ProductType>,
  },
};

export type PriceRange = {
  minimum_price: {
    final_price: {
      currency: string,
      value: number,
    },
  },
};

export type ProductType = {
  id: number,
  name: string,
  sku: string,
  small_image: {
    url: string,
  },
  price_range: PriceRange,
};
