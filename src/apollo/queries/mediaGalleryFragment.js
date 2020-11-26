/**
 * @flow
 * Created by Dima Portenko on 24.11.2020
 */
import { gql } from '@apollo/client';

export const MEDIA_GALLERY_FRAGMENT = gql`
  fragment MediaGallery on ProductInterface {
    media_gallery {
      disabled
      label
      position
      url
    }
  }
`;

export type MediaGalleryItemType = {
  disabled: boolean,
  label: string,
  position: number,
  url: string,
};

export type MediaGallery = {
  media_gallery: Array<MediaGalleryItemType>,
};
