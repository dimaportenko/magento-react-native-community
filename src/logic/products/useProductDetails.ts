/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  ConfigurableProductVariant,
  GET_PRODUCT_DETAILS,
  ProductDetailsResponseType,
  ProductDetailsType,
} from '../../apollo/queries/getProductDetails';
import { useCart } from '../cart/useCart';
import { PriceRange } from '../../apollo/queries/getCategoryProducts';
import { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';

export type SelectedConfigurableProductOptions = { [key: string]: number };
export type HandleSelectConfigurableOption = (optionCode: string, valueIndex: number) => void;

type Props = {
  sku: string;
};

type Result = {
  getProductDetails: () => void;
  loading: boolean;
  productData: ProductDetailsType | null | undefined;
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions;
  handleSelectConfigurableOption: HandleSelectConfigurableOption;
  price: PriceRange | null;
  mediaGallery: MediaGalleryItemType[];
  addProductLoading: boolean;
  addToCart(): void;
};

const findSelectProductVariant = (
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions,
  productData: ProductDetailsType,
): ConfigurableProductVariant | null => {
  if (productData.__typename !== 'ConfigurableProduct') {
    return null;
  }
  let variants = productData.variants;
  Object.keys(selectedConfigurableProductOptions).forEach(code => {
    variants = variants.filter(variant => {
      const attribute = variant.attributes.find(attr => attr.code === code);
      return attribute?.value_index === selectedConfigurableProductOptions[code];
    });
  });

  return variants?.[0];
};

export const useProductDetails = ({ sku }: Props): Result => {
  const [productData, setProductData] = useState<ProductDetailsType | null | undefined>(null);
  const [selectedConfigurableProductOptions, setSelectedConfigurableProductOptions] = useState<
    SelectedConfigurableProductOptions
  >({});
  const [selectedVariant, setSelectedVariant] = useState<ConfigurableProductVariant | null>(null);
  const [price, setPrice] = useState<PriceRange | null>(null);
  const [mediaGallery, setMediaGallery] = useState<MediaGalleryItemType[]>([]);

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
  }, [selectedVariant, productData]);

  useEffect(() => {
    if (productData && Object.keys(selectedConfigurableProductOptions).length > 0) {
      const variant = findSelectProductVariant(selectedConfigurableProductOptions, productData);
      setSelectedVariant(variant);
    }
  }, [productData, selectedConfigurableProductOptions]);

  const handleSelectConfigurableOption: HandleSelectConfigurableOption = (
    optionCode,
    valueIndex,
  ) => {
    setSelectedConfigurableProductOptions({
      ...selectedConfigurableProductOptions,
      [optionCode]: valueIndex,
    });
  };

  const addProductToCart = () => {
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
          parent_sku: productData.sku,
          sku: selectedVariant.product.sku,
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
    selectedConfigurableProductOptions,
    handleSelectConfigurableOption,
    price,
    mediaGallery,
    addToCart: addProductToCart,
    addProductLoading,
  };
};
