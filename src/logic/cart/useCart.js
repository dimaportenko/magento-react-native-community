/**
 * @flow
 * Created by Dima Portenko on 04.01.2021
 */
import React, { useEffect } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_CART } from '../../apollo/mutations/createCart';
import type { CreateCartResponseType } from '../../apollo/mutations/createCart';
import { useDispatch, useSelector } from 'react-redux';
import { getCartId, setCartId } from '../../redux/cart';
import type { StoreStateType } from '../../redux/reducers';
import type { CartReducerType } from '../../redux/cart';

type Props = {||};

type Result = {|
  cartId: $PropertyType<CartReducerType, 'cartId'>,
|};

export const useCart = (): Result => {
  const cartId = useSelector<
    StoreStateType,
    $PropertyType<CartReducerType, 'cartId'>,
  >(getCartId);
  const dispatch = useDispatch();

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

      dispatch(setCartId(data.cartId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.warn({ cartId });
    if (!cartId) {
      createCart();
    }
  }, []); // eslint-disable-line

  return {
    cartId,
  };
};
