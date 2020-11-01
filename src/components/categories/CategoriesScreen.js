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

export const CategoriesScreen = () => {
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

  const renderItem = ({ item, index }: { item: CategoryType, index: number }) => {
    const disabled = item.children_count < 1;
    return (
      <TouchableOpacity onPress={() => onCategoryItemPress(item)} disabled={disabled}>
        <View center height={80} bg-grey50={!disabled} bg-grey40={disabled} marginH-15 marginB-15 br40>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View flex paddingT-15>
      <FlatList
        data={categories}
        keyExtractor={(item) => (`categoryItem${item.id.toString()}`)}
        renderItem={renderItem}
      />
    </View>
  );
};
