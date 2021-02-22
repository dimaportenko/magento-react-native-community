/**
 * @flow
 * Created by Dima Portenko on 24.11.2020
 */
import { gql } from '@apollo/client';

export const PRODUCT_PRICE_FRAGMENT = gql`
  fragment ProductPrice on ProductInterface {
    price_range {
      minimum_price {
        final_price {
          currency
          value
        }
      }
    }
  }
`;

export type PriceRangeItemType = {
  minimum_price: {
    final_price: {
      currency: string,
      value: number,
    },
  },
};

export type ProductPriceFragmentType = {
  price_range: PriceRangeItemType,
};
