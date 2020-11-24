/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../../apollo/queries/getProductDetails';

type Props = {|
  sku: string,
|};

type Result = {|
  getProductDetails: () => void,
  loading: boolean,
|};

export const useProductDetails = ({ sku }: Props): Result => {
  const [getProductDetailsQuery, responseObject] = useLazyQuery(
    GET_PRODUCT_DETAILS,
    {
      variables: { sku },
      onCompleted: (response) => {
        console.log(response);
      },
    },
  );

  const getProductDetails = () => {
    getProductDetailsQuery();
  };

  return {
    getProductDetails,
    loading: false,
  };
};
