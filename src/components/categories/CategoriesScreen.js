/**
 * @flow
 * Created by Dima Portenko on 06.10.2020
 */
import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, View } from 'react-native-markup-kit';
import { useCategories } from '../../logic/categories/useCategories';
import type { CategoryType } from '../../apollo/queries/getCategory';
import { useNavigation, useRoute } from '@react-navigation/core';
import * as routes from '../../navigation/routes';
import { CategoryListItem } from './CategoryListItem';
import { useCategoryColors } from '../../logic/categories/useCategoryColors';

export const CategoriesScreen = () => {
  const { getCategoryColorByIndex } = useCategoryColors();
  const route = useRoute();
  const navigation = useNavigation();
  const { getCategories, categories, loading } = useCategories({
    categoryId: route?.params?.categoryId ?? '2',
  });

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onCategoryItemPress = (item: CategoryType) => {
    navigation.push(routes.NAVIGATION_CATEGORIES_ROUTE, {
      categoryId: item.id,
      title: item.name,
    });
  };

  if (loading) {
    return (
      <View flex center>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: CategoryType,
    index: number,
  }) => {
    return (
      <CategoryListItem
        item={item}
        onPress={onCategoryItemPress}
        color={getCategoryColorByIndex(index)}
        index={index}
      />
    );
  };

  return (
    <View flex paddingT-15>
      <FlatList
        data={categories}
        keyExtractor={(item) => `categoryItem${item.id.toString()}`}
        renderItem={renderItem}
      />
    </View>
  );
};
