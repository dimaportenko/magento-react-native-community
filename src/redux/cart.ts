/**
 * @flow
 * Created by Dima Portenko on 10.01.2021
 */
import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartId: null,
  },
  reducers: {
    setCartId(state, action?) {
      state.cartId = action.payload;
    },
  },
});

export const { setCartId } = cartSlice.actions;

export const getCartId = createSelector(
  (state) => state.cart,
  (cart) => cart.cartId,
);

export default cartSlice.reducer;
