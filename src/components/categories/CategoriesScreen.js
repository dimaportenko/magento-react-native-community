/**
 * @flow
 * Created by Dima Portenko on 06.10.2020
 */
import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text, View, Constants } from 'react-native-markup-kit';
import { useCategories } from '../../logic/categories/useCategories';
import type { CategoryType } from '../../apollo/queries/getCategory';
import { useNavigation, useRoute } from '@react-navigation/core';
import * as routes from '../../navigation/routes';

export const CategoriesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getCategories, categories } = useCategories({
    categoryId: route?.params?.categoryId ?? '2',
  });

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    // console.warn({ categories });
  }, [categories]);

  const onCategoryItemPress = (item: CategoryType) => {
    navigation.push(routes.NAVIGATION_CATEGORIES_ROUTE, {
      categoryId: item.id,
      title: item.name,
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: CategoryType,
    index: number,
  }) => {
    const disabled = item.children_count < 1;
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => onCategoryItemPress(item)}>
        <View
          bg-grey50={!disabled}
          bg-grey40={disabled}
          center
          marginH-15
          marginT-15
          height={100}
          br60>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View flex>
      <FlatList
        data={categories}
        keyExtractor={(item: CategoryType) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};
