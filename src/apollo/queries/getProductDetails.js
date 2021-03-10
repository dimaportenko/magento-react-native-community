/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';
import { PRODUCT_PRICE_FRAGMENT } from './productPriceFragment';
import type { MediaGalleryItemType } from './mediaGalleryFragment';
import type { PriceRange } from './getCategoryProducts';
import type { PriceRangeItemType } from './productPriceFragment';

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
        ...ProductPrice
        ...MediaGallery
        ... on ConfigurableProduct {
          configurable_options {
            attribute_code
            label
            values {
              label
              value_index
              swatch_data {
                value
              }
            }
          }
          variants {
            attributes {
              code
              value_index
            }
            product {
              sku
              ...ProductPrice
              ...MediaGallery
            }
          }
        }
      }
      total_count
    }
  }
  ${PRODUCT_PRICE_FRAGMENT}
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
  value_index: number,
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

export type ConfigurableVariantProductType = {
  sku: string,
  price_range: PriceRangeItemType,
  media_gallery: Array<MediaGalleryItemType>,
};

export type ConfigurableProductVariantAttributeType = {
  code: string,
  value_index: number,
};

export type ConfigurableProductVariantType = {
  attributes: ConfigurableProductVariantAttributeType[],
  product: ConfigurableVariantProductType,
};

export type ConfigurableProductDetailsType = {
  ...ProductInterfaceDetailsType,
  __typename: 'ConfigurableProduct',
  configurable_options: ConfigurableProductOptionsType[],
  variants: ConfigurableProductVariantType[],
};

export type ProductDetailsType = SimpleProductDetailsType | ConfigurableProductDetailsType;

export type ProductDetailsResponseType = {
  products: {
    total_count: number,
    items: Array<ProductDetailsType>,
  },
};
