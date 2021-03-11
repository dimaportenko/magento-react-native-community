/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../../apollo/queries/getProductDetails';
import type {
  ConfigurableProductVariantType,
  ProductDetailsResponseType,
  ProductDetailsType,
} from '../../apollo/queries/getProductDetails';
import type { PriceRange } from '../../apollo/queries/getCategoryProducts';
import type { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';
import { useCart } from '../cart/useCart';

export type SelectedConfigurableOptionsType = { [key: string]: number };
export type HandleConfigurableOptionsSelectType = (code: string, value_index: number) => void;

type Props = {|
  sku: string,
|};

type Result = {|
  getProductDetails: () => void,
  loading: boolean,
  productData: ?ProductDetailsType,
  handleConfigurableOptionsSelect: HandleConfigurableOptionsSelectType,
  selectedConfigurableOptions: SelectedConfigurableOptionsType,
  price: ?PriceRange,
  mediaGallery: MediaGalleryItemType[],
  addToCart: () => void,
  addProductLoading: boolean,
|};

const findSelectedVariant = (
  selectedConfigurableOptions: SelectedConfigurableOptionsType,
  productData: ProductDetailsType,
): ?ConfigurableProductVariantType => {
  if (productData.__typename !== 'ConfigurableProduct') {
    return null;
  }
  let variants = productData.variants;
  Object.keys(selectedConfigurableOptions).forEach((code) => {
    variants = variants.filter((variant) => {
      const attribute = variant.attributes.find((attribute) => attribute.code === code);
      return attribute?.value_index === selectedConfigurableOptions[code];
    });
  });

  return variants?.[0];
};

export const useProductDetails = ({ sku }: Props): Result => {
  const [productData, setProductData] = useState<?ProductDetailsType>(null);
  const [selectedVariant, setSelectedVariant] = useState<?ConfigurableProductVariantType>(null);
  const [price, setPrice] = useState<?PriceRange>(null);
  const [mediaGallery, setMediaGallery] = useState<MediaGalleryItemType[]>([]);
  const [
    selectedConfigurableOptions,
    setSelectedConfigurableOptions,
  ] = useState<SelectedConfigurableOptionsType>({});

  const { addToCart, addProductLoading } = useCart();

  const [getProductDetailsQuery, responseObject] = useLazyQuery<ProductDetailsResponseType>(
    GET_PRODUCT_DETAILS,
    {
      variables: { sku },
    },
  );

  const { loading, data } = responseObject;

  const getProductDetails = () => {
    getProductDetailsQuery();
  };

  useEffect(() => {
    setProductData(data?.products?.items?.[0]);
  }, [data]);

  useEffect(() => {
    if (productData) {
      if (selectedVariant) {
        setPrice(selectedVariant.product.price_range);
        setMediaGallery([...selectedVariant.product.media_gallery, ...productData.media_gallery]);
      } else {
        setPrice(productData.price_range);
        setMediaGallery(productData.media_gallery);
      }
    }
  }, [productData, selectedVariant]);

  useEffect(() => {
    if (productData && Object.keys(selectedConfigurableOptions).length > 0) {
      const variant = findSelectedVariant(selectedConfigurableOptions, productData);
      setSelectedVariant(variant);
    }
  }, [selectedConfigurableOptions, productData]);

  const handleConfigurableOptionsSelect = (code: string, value_index: number): void => {
    setSelectedConfigurableOptions({ ...selectedConfigurableOptions, [code]: value_index });
  };

  const addToCartSelectedProduct = () => {
    if (productData?.__typename === 'SimpleProduct') {
      addToCart(
        {
          sku: productData.sku,
          quantity: 1,
        },
        productData.name,
      );
    } else if (productData?.__typename === 'ConfigurableProduct' && selectedVariant) {
      addToCart(
        {
          parentSku: productData.sku,
          sku: selectedVariant?.product.sku,
          quantity: 1,
        },
        productData.name,
      );
    }
  };

  return {
    getProductDetails,
    loading,
    productData,
    handleConfigurableOptionsSelect,
    selectedConfigurableOptions,
    price,
    mediaGallery,
    addToCart: addToCartSelectedProduct,
    addProductLoading,
  };
};
