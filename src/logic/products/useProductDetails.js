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
|};

export const useProductDetails = ({ sku }: Props): Result => {
  const [productData, setProductData] = useState<?ProductDetailsType>(null);
  const [
    selectedConfigurableOptions,
    setSelectedConfigurableOptions,
  ] = useState<SelectedConfigurableOptionsType>({});

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

  const handleConfigurableOptionsSelect = (code: string, value_index: number): void => {
    setSelectedConfigurableOptions({ ...selectedConfigurableOptions, [code]: value_index });
  };

  return {
    getProductDetails,
    loading,
    productData,
    handleConfigurableOptionsSelect,
    selectedConfigurableOptions,
  };
};
