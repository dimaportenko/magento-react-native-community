/**
 * @flow
 * Created by Dima Portenko on 24.11.2020
 */
import { gql } from '@apollo/client';
import { CART_DETAIL_ITEMS_FRAGMENT } from '../queries/cartItemsFragment';
import { GetCartDetailsResponse } from '../queries/getCartDetails';

export const REMOVE_ITEM_FROM_CART = gql`
  mutation removeItem($cartId: String!, $cartItemUid: ID) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $cartItemUid }) {
      cart {
        ...CartDetailItems
      }
    }
  }
  ${CART_DETAIL_ITEMS_FRAGMENT}
`;

export type RemoveItemFromCartResponse = {
  removeItemFromCart: GetCartDetailsResponse;
};

export type CreateCartResponseType = {
  cartId: string;
};
