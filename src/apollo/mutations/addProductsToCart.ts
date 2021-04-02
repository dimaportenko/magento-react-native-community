/**
 * @flow
 * Created by Dima Portenko on 24.11.2020
 */
import { gql } from '@apollo/client';

export const ADD_PRODUCTS_TO_CART = gql`
  mutation AddProductsToCart(
    $cartId: String!
    $quantity: Float!
    $sku: String!
    $parent_sku: String
  ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: [{ quantity: $quantity, sku: $sku, parent_sku: $parent_sku }]
    ) {
      cart {
        items {
          id
          product {
            name
            sku
          }
          quantity
        }
      }
      user_errors {
        message
      }
    }
  }
`;

export type AddProductsToCartResponseType = {
  addProductsToCart: {
    cart: {
      items: {
        id: string;
        product: {
          name: string;
          sku: string;
        };
        quantity: number;
      };
    };
    user_errors: Array<{
      message: string;
    }>;
  };
};
