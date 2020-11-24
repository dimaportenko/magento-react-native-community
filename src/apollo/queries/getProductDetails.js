/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */

import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';

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


