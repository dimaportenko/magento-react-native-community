/**
 * @flow
 * Created by Dima Portenko on 24.11.2020
 */
import { gql } from '@apollo/client';

export const CART_DETAIL_ITEMS_FRAGMENT = gql`
  fragment CartDetailItems on Cart {
    items {
      prices {
        price {
          currency
          value
        }
      }
      product {
        sku
        name
      }
      quantity

      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
      }
    }
  }
`;

export type CartDetailItemType = {
  prices: {
    price: {
      currency: string;
      value: number;
    };
  };
  product: {
    sku: string;
    name: string;
  };
  quantity: number;

  configurable_options?: {
    option_label: string;
    value_label: string;
  };
};

export type CartDetailItemsType = {
  items: CartDetailItemType[];
};
