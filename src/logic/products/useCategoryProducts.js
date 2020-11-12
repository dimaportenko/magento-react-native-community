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
  loading: boolean,
  refreshing: boolean,
  loadMore(): void,
  refresh(): void,
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
    onCompleted: (data) => {
      if (data?.products?.items && currentPage === 1) {
        setProducts(data?.products?.items);
      } else if (
        data?.products?.items &&
        currentPage * PAGE_SIZE > products.length &&
        data.products.total_count > products.length
      ) {
        setProducts([...products, ...data?.products?.items]);
      }
    },
  });
  const { loading, error } = queryResponse;

  useEffect(() => {
    getCategoryProducts();
  }, [currentPage, getCategoryProducts]);

  const refresh = () => {
    if (currentPage != 1) {
      setCurrentPage(1);
    } else {
      getCategoryProducts();
    }
  };

  const loadMore = () => {
    if (loading || products.length < 1) {
      return;
    }
    if (currentPage * PAGE_SIZE === products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    products,
    loading,
    refresh,
    loadMore,
    refreshing: loading && currentPage === 1,
  };
};
