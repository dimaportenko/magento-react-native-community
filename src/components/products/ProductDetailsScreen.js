/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import {
  View,
  Text,
  Constants,
  Colors,
} from 'react-native-markup-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/core';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { MediaGallery } from '../common/MediaGallery';
import { priceStringFromPriceRange } from '../../logic/util/price';
import HTML from 'react-native-render-html';
import TouchableRipple from '../common/TouchableRipple';

export const ProductDetailsScreen = () => {
  const insets = useSafeAreaInsets();
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
      <ScrollView>
        <View flex style={{ paddingBottom: insets.bottom + 50 }}>
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
      <TouchableRipple
        color={Colors.black}
        rippleColor="rgba(255, 255, 255, 0.2)"
        onPress={() => {}}>
        <View style={[styles.buttonContainer, { marginBottom: insets.bottom }]}>
          <Icon name="md-cart" color={Colors.white} size={16} />
          <Text marginH-7 white>
            Add to cart
          </Text>
        </View>
      </TouchableRipple>
      <View absB width="100%" height={insets.bottom} bg-white />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.black,
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
