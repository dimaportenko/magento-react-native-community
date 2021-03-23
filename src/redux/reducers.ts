/**
 * @flow
 * Created by Dima Portenko on 10.01.2021
 */
import { combineReducers } from 'redux';
import cartReducer, { CartReducerType } from './cart';

export type StoreType = {
  cart: CartReducerType;
};

export default combineReducers({
  cart: cartReducer,
});
