/**
 * @flow
 * Created by Dima Portenko on 02.04.2021
 */
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { CartDetailTotals, GET_CART_DETAILS, GetCartDetailsResponse } from '../../apollo/queries/getCartDetails';
import { useSelector } from 'react-redux';
import { getCartId } from '../../redux/cart';
import { useState } from 'react';
import { CartDetailItemType } from '../../apollo/queries/cartItemsFragment';

interface Props {}

interface Result {
  getCartDetails(): void;
  cartItems: CartDetailItemType[];
  loading: boolean;
  totals: CartDetailTotals | null;
}

export const useCartDetails = (): Result => {
  const cartId = useSelector(getCartId);
  const [cartItems, setCartItems] = useState<CartDetailItemType[]>([]);
  const [totals, setTotals] = useState<CartDetailTotals | null>(null);

  const [getCartDetails, responseObject] = useLazyQuery<GetCartDetailsResponse>(GET_CART_DETAILS, {
    variables: { cartId },
  });

  const { data, loading, error } = responseObject;

  useEffect(() => {
    if (data) {
      setCartItems(data?.cart.items);
      setTotals(data?.cart.prices);
    }
    console.log('cart details data', data);
    console.log('cart details error', error);
  }, [data, error]);

  return {
    getCartDetails,
    cartItems,
    loading,
    totals,
  };
};
