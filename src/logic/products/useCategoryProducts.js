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
  refreshing: boolean,
  refresh(): void,
  loadMore(): void,
|};

const PAGE_SIZE = 10;

export const useCategoryProducts = ({ categoryId }: Props): Result => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [
    getCategoryProducts,
    queryResponse,
  ] = useLazyQuery<GetCategoryProductsType>(GET_CATEGORY_PRODUCTS, {
    variables: { id: categoryId, pageSize: PAGE_SIZE, currentPage },
    fetchPolicy: 'no-cache',
    onCompleted: (responseData) => {
      if (responseData?.products?.items && currentPage === 1) {
        setProducts(responseData?.products?.items);
      } else if (
        responseData?.products?.items &&
        products.length < responseData.products.total_count &&
        products.length < currentPage * PAGE_SIZE
      ) {
        setProducts([...products, ...responseData?.products?.items]);
      }
    },
  });
  const { loading, error, data } = queryResponse;

  useEffect(() => {
    if (!loading) {
      getCategoryProducts();
    }
  }, [currentPage, getCategoryProducts]);

  const refresh = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      getCategoryProducts();
    }
  };

  const loadMore = () => {
    if (loading) {
      return;
    }

    if (currentPage * PAGE_SIZE === products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    products,
    getCategoryProducts,
    loading,
    refreshing: loading,
    refresh,
    loadMore,
  };
};
