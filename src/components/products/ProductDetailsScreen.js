/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native-markup-kit';
import { useRoute } from '@react-navigation/core';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { MediaGallery } from '../common/MediaGallery';

export const ProductDetailsScreen = () => {
  const route = useRoute();
  const { getProductDetails, loading, productData } = useProductDetails({
    sku: route?.params?.sku,
  });

  useEffect(() => {
    getProductDetails();
  }, []);

  if (loading) {
    return (
      <View flex center>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View flex>
      <MediaGallery items={productData?.media_gallery ?? []} />
      <Text>Product Details</Text>
    </View>
  );
};
