/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React from 'react';

type Props = {|

|};

type Result = {|
  getProductDetails: () => void,
  loading: boolean,
|};

export const useProductDetails = (props: Props): Result => {

  const getProductDetails = () => {};

  return {
    getProductDetails,
    loading: false,
  };
};
