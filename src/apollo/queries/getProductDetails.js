/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';
import type { MediaGalleryItemType } from './mediaGalleryFragment';

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        id
        sku
        name
        ...MediaGallery
      }
      total_count
    }
  }
  ${MEDIA_GALLERY_FRAGMENT}
`;

export type ProductDetailsType = {
  id: number,
  sku: string,
  name: string,
  media_gallery: Array<MediaGalleryItemType>,
};

export type ProductDetailsResponseType = {
  products: {
    total_count: number,
    items: Array<ProductDetailsType>,
  },
};
