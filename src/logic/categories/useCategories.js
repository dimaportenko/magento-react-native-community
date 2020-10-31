/**
 * @flow
 * Created by Dima Portenko on 10.10.2020
 */
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../apollo/queries/getCategory';
import type {
  CategoryType,
  CategoryListType,
} from '../../apollo/queries/getCategory';

type Props = {|
  categoryId: string,
|};

type Result = {|
  getCategories(): void,
  categories: Array<CategoryType>,
  loading: boolean,
|};

export const useCategories = (props: Props): Result => {
  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [
    getCategories,
    { called, loading, data, error },
  ] = useLazyQuery(GET_CATEGORIES, { variables: { id: props.categoryId } });

  useEffect(() => {
    if (data) {
      const list: CategoryListType = data;
      console.log({ data });
      if (list.categoryList?.[0]?.children) {
        setCategories(list.categoryList?.[0]?.children);
      }
    }
    if (error) {
      console.log({ error });
    }
  }, [data, error]);

  return {
    getCategories,
    categories,
    loading,
  };
};
