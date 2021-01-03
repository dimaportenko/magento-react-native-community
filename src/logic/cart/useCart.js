/**
 * @flow
 * Created by Dima Portenko on 03.01.2021
 */
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CART } from '../../apollo/mutations/createCart';
import type { CreateCartResponseType } from '../../apollo/mutations/createCart';
import { GraphQLError } from 'graphql';

type Props = {||};

type Result = {|
  cartId: ?string,
|};

export const useCart = (): Result => {
  const [cartId, setCartId] = useState(null);

  const [fetchCartId] = useMutation(CREATE_CART);

  const createCart = async () => {
    try {
      const {
        data,
        errors,
      }: {
        data: CreateCartResponseType,
        errors: GraphQLError[],
      } = await fetchCartId({
        fetchPolicy: 'no-cache',
      });
      console.log('cart id response', data);
      setCartId(data.cartId);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    createCart();
  }, []);

  return {
    cartId,
  };
};
