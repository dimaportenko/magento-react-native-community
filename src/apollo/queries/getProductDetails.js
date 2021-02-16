/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';
import type { MediaGalleryItemType } from './mediaGalleryFragment';
import type { PriceRange } from './getCategoryProducts';

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        id
        sku
        name
        description {
          html
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
        ...MediaGallery
        ... on ConfigurableProduct {
          configurable_options {
            attribute_code
            label
            values {
              label
              swatch_data {
                value
              }
            }
          }
        }
      }
      total_count
    }
  }
  ${MEDIA_GALLERY_FRAGMENT}
`;

export type ProductInterfaceDetailsType = {
  id: number,
  sku: string,
  name: string,
  media_gallery: Array<MediaGalleryItemType>,
  price_range: PriceRange,
  description: {
    html: string,
  },
};

export type SimpleProductDetailsType = {
  ...ProductInterfaceDetailsType,
  __typename: 'SimpleProduct',
};

export type ConfigurableProductOptionValueType = {
  label: string,
  swatch_data: {
    value: string,
    __typename: 'ImageSwatchData' | 'TextSwatchData' | 'ColorSwatchData',
  },
};

export type ConfigurableProductOptionsType = {
  attribute_code: string,
  label: string,
  values: ConfigurableProductOptionValueType[],
};

export type ConfigurableProductDetailsType = {
  ...ProductInterfaceDetailsType,
  __typename: 'ConfigurableProduct',
  configurable_options: ConfigurableProductOptionsType[],
};

export type ProductDetailsType = SimpleProductDetailsType | ConfigurableProductDetailsType;

export type ProductDetailsResponseType = {
  products: {
    total_count: number,
    items: Array<ProductDetailsType>,
  },
};
