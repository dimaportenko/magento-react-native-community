/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../../apollo/queries/getProductDetails';
import type {
  ProductDetailsResponseType,
  ProductDetailsType,
} from '../../apollo/queries/getProductDetails';

export type SelectedConfigurableProductOptions = { [key: string]: number };
export type HandleSelectConfigurableOption = (optionCode: string, valueIndex: number) => void;

type Props = {|
  sku: string,
|};

type Result = {|
  getProductDetails: () => void,
  loading: boolean,
  productData: ?ProductDetailsType,
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions,
  handleSelectConfigurableOption: HandleSelectConfigurableOption,
|};

export const useProductDetails = ({ sku }: Props): Result => {
  const [productData, setProductData] = useState<?ProductDetailsType>(null);
  const [
    selectedConfigurableProductOptions,
    setSelectedConfigurableProductOptions,
  ] = useState<SelectedConfigurableProductOptions>({});

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

  const handleSelectConfigurableOption: HandleSelectConfigurableOption = (
    optionCode,
    valueIndex,
  ) => {
    setSelectedConfigurableProductOptions({
      ...selectedConfigurableProductOptions,
      [optionCode]: valueIndex,
    });
  };

  return {
    getProductDetails,
    loading,
    productData,
    selectedConfigurableProductOptions,
    handleSelectConfigurableOption,
  };
};
