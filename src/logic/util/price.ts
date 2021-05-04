/**
 * @flow
 * Created by Dima Portenko on 06.12.2020
 */
import type { PriceRange } from '../../apollo/queries/getCategoryProducts';

const CURRENCY_SYMBOLS: { [key: string]: string | undefined } = {
  USD: '$',
};

export const priceStringFromPriceRange = (priceRange: PriceRange | null) => {
  if (priceRange) {
    return `${getPriceString(priceRange.minimum_price.final_price)}`;
  }

  return '';
};

type PriceValue = {
  currency: string;
  value: number;
};

export const getPriceString = (price?: PriceValue) => {
  const currencyName = price?.currency ?? '';
  const currency = CURRENCY_SYMBOLS[currencyName] ?? price?.currency;
  return `${currency} ${price?.value}`;
};
