/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { View, Text, Constants } from 'react-native-markup-kit';
import { useRoute } from '@react-navigation/core';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { MediaGallery } from '../common/MediaGallery';
import { priceStringFromPriceRange } from '../../logic/util/price';
import HTML from 'react-native-render-html';

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
    <ScrollView>
      <View flex>
        <MediaGallery items={productData?.media_gallery ?? []} />
        <Text marginT-15 text70 center>
          {productData?.name}
        </Text>
        <Text text70 center>
          {priceStringFromPriceRange(productData?.price_range)}
        </Text>
        {!!productData && (
          <View paddingH-15>
            <HTML
              source={{ html: productData?.description.html }}
              contentWidth={Constants.screenWidth}
              baseFontStyle={{ fontSize: 15 }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
