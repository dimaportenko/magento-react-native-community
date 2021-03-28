/**
 * @flow
 * Created by Dima Portenko on 10.01.2021
 */
import { combineReducers } from 'redux';
import cartReducer, { CartReducerState } from './cart';

export type StoreState = {
  cart: CartReducerState;
};

export default combineReducers({
  cart: cartReducer,
});
