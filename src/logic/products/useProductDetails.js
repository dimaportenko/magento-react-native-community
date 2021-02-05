/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../../apollo/queries/getProductDetails';
import type {
  ProductDetailsResponseType,
  ProductDetailsType,
} from '../../apollo/queries/getProductDetails';

type Props = {|
  sku: string,
|};

type Result = {|
  getProductDetails: () => void,
  loading: boolean,
  productData: ?ProductDetailsType,
|};

export const useProductDetails = ({ sku }: Props): Result => {
  const [productData, setProductData] = useState<?ProductDetailsType>(null);

  const [getProductDetailsQuery, responseObject] = useLazyQuery<ProductDetailsResponseType>(
    GET_PRODUCT_DETAILS,
    {
      variables: { sku },
      onCompleted: (response) => {
        console.log(response);
        setProductData(response?.products?.items?.[0]);
      },
    },
  );

  const { loading } = responseObject;

  const getProductDetails = () => {
    getProductDetailsQuery();
  };

  return {
    getProductDetails,
    loading,
    productData,
  };
};
