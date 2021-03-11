/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';
import { PRODUCT_PRICE_FRAGMENT } from './productPriceFragment';
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
              ...MediaGallery
              ...ProductPrice
            }
          }
        }
      }
      total_count
    }
  }
  ${MEDIA_GALLERY_FRAGMENT}
  ${PRODUCT_PRICE_FRAGMENT}
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

export type ConfigurableProductVariantAttribute = {
  code: string,
  value_index: number,
};

export type ConfigurableProductVariantProduct = {
  sku: string,
  media_gallery: Array<MediaGalleryItemType>,
  price_range: PriceRange,
};

export type ConfigurableProductVariant = {
  attributes: ConfigurableProductVariantAttribute[],
  product: ConfigurableProductVariantProduct,
};

export type ConfigurableProductDetailsType = {
  ...ProductInterfaceDetailsType,
  __typename: 'ConfigurableProduct',
  configurable_options: ConfigurableProductOptionsType[],
  variants: ConfigurableProductVariant[],
};

export type ProductDetailsType = SimpleProductDetailsType | ConfigurableProductDetailsType;

export type ProductDetailsResponseType = {
  products: {
    total_count: number,
    items: Array<ProductDetailsType>,
  },
};
