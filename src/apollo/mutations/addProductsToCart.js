/**
 * @flow
 * Created by Dima Portenko on 24.11.2020
 */
import { gql } from '@apollo/client';

export const ADD_PRODUCTS_TO_CART = gql`
  mutation AddProductsToCart($cartId: String!, $quantity: Float!, $sku: String!) {
    addProductsToCart(cartId: $cartId, cartItems: [{ quantity: $quantity, sku: $sku }]) {
      cart {
        items {
          uid
          product {
            name
            sku
          }
          quantity
        }
        total_quantity
      }
      user_errors {
        code
        message
      }
    }
  }
`;

type CartUserInputErrorType = 'PRODUCT_NOT_FOUND' | 'NOT_SALABLE' | 'INSUFFICIENT_STOCK' | 'UNDEFINED';

export type AddProductsToCartResponseType = {
  addProductsToCart: {
    cart: {
      items: {
        id: string,
        product: {
          name: string,
          sku: string,
        },
        quantity: number,
      },
    },
    user_errors: {
      code: CartUserInputErrorType,
      message: string,
    }[],
  },
};
