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
      prices {
        grand_total {
          value
          currency
        }
      }
    }
  }
  ${CART_DETAIL_ITEMS_FRAGMENT}
`;

export type CartDetailsPrices = {
  grand_total: {
    value: number;
    currency: string;
  };
};

export type GetCartDetailsResponse = {
  cart: {
    items: CartDetailItemType[];
    prices: CartDetailsPrices;
  };
};
