/**
 * @flow
 * Created by Dima Portenko on 24.11.2020
 */
import { gql } from '@apollo/client';

export const CREATE_CART = gql`
  mutation createCart {
    cartId: createEmptyCart
  }
`;

export type CreateCartResponseType = {
  cartId: string,
};
