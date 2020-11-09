/**
 * @flow
 * Created by Dima Portenko on 09.11.2020
 */
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../apollo/queries/getCategory';
import { GET_PRODUCT_CATEGORIES } from '../../apollo/queries/getCategoryProducts';
import type { GetCategoryProductsType, ProductType } from '../../apollo/queries/getCategoryProducts';

type Props = {|
  categoryId: string,
|};

type Result = {|
  products: Array<ProductType>,
  getCategoryProducts(): void,
  loading: boolean,
|};

export const useCategoryProducts = (props: Props): Result => {
  const [products, setProducts] = useState([]);
  const [getCategoryProducts, queryResponse] = useLazyQuery(
    GET_PRODUCT_CATEGORIES,
    {
      variables: { id: props.categoryId, pageSize: 10, currentPage: 1 },
    },
  );
  const { loading, data, error } = queryResponse;

  useEffect(() => {
    const responseData: GetCategoryProductsType = data;
    if (responseData?.products?.items) {
      setProducts(responseData?.products?.items);
    }
    console.log(data);
    console.log(loading);
    console.log(error);
  }, [data, loading, error]);

  return {
    products,
    getCategoryProducts,
    loading,
  };
};
