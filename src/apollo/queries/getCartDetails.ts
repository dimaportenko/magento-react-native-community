/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';
import { PriceRange, ProductType } from './getCategoryProducts';
import { PRODUCT_PRICE_FRAGMENT } from './productPriceFragment';

export const GET_CART_DETAILS = gql`
  query GetCartDetails($cartId: String!) {
    cart(cart_id: $cartId) {
      items {
        product {
          id
          sku
          name
          small_image {
            url
          }
          ...ProductPrice
        }
      }
      total_quantity
    }
  }
  ${PRODUCT_PRICE_FRAGMENT}
`;

export type CartDetailsItemType = {
  product: ProductType;
};

export type CartDetailsResponseType = {
  cart: {
    items: CartDetailsItemType[];
    total_quantity: number;
  };
};

export type CartProductProductType = {
  id: number;
  name: string;
  sku: string;
  small_image: {
    url: string;
  };
  price_range: PriceRange;
};
