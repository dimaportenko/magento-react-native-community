/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';
import { CartDetailItemType, CART_DETAIL_ITEMS_FRAGMENT } from './cartItemsFragment';

export const GET_CART_DETAILS = gql`
  query GetCartDetails($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CartDetailItems
    }
  }
  ${CART_DETAIL_ITEMS_FRAGMENT}
`;

export type GetCartDetailsResponse = {
  cart: {
    items: CartDetailItemType[];
  };
};
