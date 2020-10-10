/**
 * @flow
 * Created by Dima Portenko on 06.10.2020
 */
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useCategories } from '../../logic/category/useCategories';

export const CategoriesScreen = () => {
  const { getCategories } = useCategories({ categoryId: '2' });

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Categories Screen</Text>
    </View>
  );
};
