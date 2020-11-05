/**
 * @flow
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
        image
        productImagePreview: products(pageSize: 1) {
          items {
            small_image {
              url
            }
          }
        }
      }
    }
  }
`;

export type CategoryListType = {
  categoryList: Array<CategoryListNodeType>,
};

export type CategoryListNodeType = {
  id: number,
  children: Array<CategoryType>,
};

export type CategoryType = {
  id: number,
  name: string,
  product_count: number,
  children_count: number,
  image: ?string,
  productImagePreview: CategoryProductImagePreview,
};

export type CategoryProductImagePreview = {
  items: Array<{
    small_image: {
      url: string,
    },
  }>,
};
