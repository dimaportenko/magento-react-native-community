/**
 * @flow
 * Created by Dima Portenko on 28.03.2021
 */
import React from 'react';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { CartDetailsResponseType, GET_CART_DETAILS } from '../../apollo/queries/getCartDetails';
import { useSelector } from 'react-redux';
import { getCartId } from '../../redux/cart';

interface Props {}

interface Result {
  getCartDetails(): void;
  loading: boolean;
  cartDetails: CartDetailsResponseType | undefined;
  error: ApolloError | undefined;
}

export const useCartDetails = (): Result => {
  const cartId = useSelector(getCartId);
  // console.log( { cartId });
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
    loading,
    cartDetails: data,
    error,
  };
};
