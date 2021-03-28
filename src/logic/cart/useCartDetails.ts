/**
 * @flow
 * Created by Dima Portenko on 28.03.2021
 */
import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { CartDetailsResponseType, GET_CART_DETAILS } from '../../apollo/queries/getCartDetails';
import { useSelector } from 'react-redux';
import { getCartId } from '../../redux/cart';

interface Props {}

interface Result {
  getCartDetails(): void;
}

export const useCartDetails = (): Result => {
  const cartId = useSelector(getCartId);
  const [getCartDetails, { data, error, loading }] = useLazyQuery<CartDetailsResponseType>(
    GET_CART_DETAILS,
    {
      variables: {
        cartId,
      },
    },
  );

  return {
    getCartDetails,
  };
};
