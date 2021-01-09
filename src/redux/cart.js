/**
 * @flow
 * Created by Dima Portenko on 09.01.2021
 */
import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { StoreStateType } from './reducers';

export type CartReducerType = {
  cartId: string | null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartId: null,
  },
  reducers: {
    setCartId(state, action) {
      state.cartId = action.payload;
    },
  },
});

export const { setCartId } = cartSlice.actions;

export default cartSlice.reducer;

export const getCartId = createSelector(
  (state: StoreStateType) => state.cart,
  (cart: CartReducerType) => cart.cartId,
);
