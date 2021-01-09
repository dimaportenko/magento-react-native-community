/**
 * @flow
 * Created by Dima Portenko on 09.01.2021
 */
import { combineReducers } from 'redux';
import cartReducer from './cart';
import type { CartReducerType } from './cart';

export type StoreStateType = {
  cart: CartReducerType,
};

export default combineReducers({
  cart: cartReducer,
});
