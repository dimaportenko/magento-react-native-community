/**
 * @flow
 * Created by Dima Portenko on 04.01.2021
 */
import React, { useState, useEffect } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_CART } from '../../apollo/mutations/createCart';
import type { CreateCartResponseType } from '../../apollo/mutations/createCart';

type Props = {||};

type Result = {|
  cartId: string | null,
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
        errors: ApolloError[],
      } = await fetchCartId();

      setCartId(data.cartId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cartId) {
      createCart();
    }
  }, []);

  return {
    cartId,
  };
};
