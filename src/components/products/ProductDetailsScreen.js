/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { View, Text, Constants } from 'react-native-markup-kit';
import { useRoute } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { MediaGallery } from '../common/MediaGallery';
import { priceStringFromPriceRange } from '../../logic/util/price';
import HTML from 'react-native-render-html';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TouchableRipple from '../common/TouchableRipple';
import { useCart } from '../../logic/cart/useCart';

export const ProductDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { getProductDetails, loading, productData } = useProductDetails({
    sku: route?.params?.sku,
  });
  const { addToCart, addProductLoading } = useCart();

  useEffect(() => {
    getProductDetails();
  }, []); // eslint-disable-line

  const onAddToCartPress = () => {
    addToCart(route?.params?.sku);
  };

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
        color="black"
        rippleColor="rgba(255, 255, 255, 0.2)"
        onPress={onAddToCartPress}>
        <View height={50} width="100%" absB bg-black center style={{ bottom: insets.bottom }}>
          <View row flex center>
            {addProductLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Icon name="cart" color="white" size={16} height={50} />
            )}
            <Text white marginH-7>
              Add To Cart
            </Text>
          </View>
        </View>
      </TouchableRipple>
      <View height={insets.bottom} width="100%" bg-white absB />
    </View>
  );
};
