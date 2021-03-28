/**
 * @flow
 * Created by Dima Portenko on 10.01.2021
 */
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { StoreState } from './reducers';

export type CartReducerState = {
  cartId: string | null;
};

const initialState: CartReducerState = {
  cartId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId(state, action?) {
      state.cartId = action.payload;
    },
  },
});

export const { setCartId } = cartSlice.actions;

export const getCartId = createSelector(
  (state: StoreState) => state.cart,
  cart => cart.cartId,
);

export default cartSlice.reducer;
