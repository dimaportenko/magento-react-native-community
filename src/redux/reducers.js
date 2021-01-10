/**
 * @flow
 * Created by Dima Portenko on 10.01.2021
 */
import { combineReducers } from 'redux';
import cartReducer from './cart';

export default combineReducers({
  cart: cartReducer,
});
