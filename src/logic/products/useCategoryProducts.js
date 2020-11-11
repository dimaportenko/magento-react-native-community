/**
 * @flow
 * Created by Dima Portenko on 09.11.2020
 */
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORY_PRODUCTS } from '../../apollo/queries/getCategoryProducts';
import type {
  GetCategoryProductsType,
  ProductType,
} from '../../apollo/queries/getCategoryProducts';

type Props = {|
  categoryId: string,
|};

type Result = {|
  products: Array<ProductType>,
  getCategoryProducts(): void,
  loading: boolean,
|};

export const useCategoryProducts = ({ categoryId }: Props): Result => {
  const [products, setProducts] = useState([]);

  const [
    getCategoryProducts,
    queryResponse,
  ] = useLazyQuery<GetCategoryProductsType>(GET_CATEGORY_PRODUCTS, {
    variables: { id: categoryId, pageSize: 10, currentPage: 1 },
  });
  const { loading, error, data } = queryResponse;

  useEffect(() => {
    console.log(data);
    const responseData: GetCategoryProductsType = data;
    if (responseData?.products?.items) {
      setProducts(responseData?.products?.items);
    }
  }, [data]);

  return {
    products,
    getCategoryProducts,
    loading,
  };
};
