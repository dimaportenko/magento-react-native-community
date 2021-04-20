/**
 * @flow
 * Created by Dima Portenko on 24.11.2020
 */
import { gql } from '@apollo/client';

export const CART_DETAIL_ITEMS_FRAGMENT = gql`
  fragment CartDetailItems on Cart {
    items {
      uid
      prices {
        price {
          currency
          value
        }
      }
      product {
        sku
        name
        image {
          url
        }
      }
      quantity

      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
      }
    }
    prices {
      grand_total {
        currency
        value
      }
    }
  }
`;

export type CartDetailTotals = {
  grand_total: {
    currency: string;
    value: number;
  };
};

export type CartDetailItemType = {
  uid: string;
  prices: {
    price: {
      currency: string;
      value: number;
    };
  };
  product: {
    sku: string;
    name: string;
    image: {
      url: string;
    };
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
