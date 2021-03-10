/**
 * @flow
 * Created by Dima Portenko on 06.12.2020
 */
import type { PriceRange } from '../../apollo/queries/getCategoryProducts';

export const priceStringFromPriceRange = (priceRange: ?PriceRange) => {
  if (priceRange) {
    return `${priceRange.minimum_price.final_price.currency} ${priceRange.minimum_price.final_price.value}`;
  }

  return '';
};
