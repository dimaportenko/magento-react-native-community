/**
 * @flow
 * Created by Dima Portenko on 23.11.2020
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { useRoute } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { MediaGallery } from '../common/MediaGallery';
import { priceStringFromPriceRange } from '../../logic/util/price';
import HTML from 'react-native-render-html';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TouchableRipple from '../common/TouchableRipple';
import { useCart } from '../../logic/cart/useCart';
import { ConfigurableProductOptions } from './options/ConfigurableProductOptions';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

export const ProductDetailsScreen = (): React$Node => {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const route = useRoute();
  const {
    getProductDetails,
    loading,
    productData,
    selectedConfigurableProductOptions,
    handleSelectConfigurableOption,
    mediaGallery,
    price,
    addToCart,
    addProductLoading,
  } = useProductDetails({
    sku: route?.params?.sku,
  });

  useEffect(() => {
    getProductDetails();
  }, []); // eslint-disable-line

  const onAddToCartPress = () => {
    addToCart();
  };

  if (loading) {
    return (
      <View flex center>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderOptions = () => {
    if (productData?.__typename === 'ConfigurableProduct') {
      return (
        <View paddingH-15>
          <ConfigurableProductOptions
            options={productData.configurable_options}
            handleSelectConfigurableOption={handleSelectConfigurableOption}
            selectedConfigurableProductOptions={selectedConfigurableProductOptions}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View flex>
      <ScrollView>
        <View flex style={{ paddingBottom: insets.bottom + 50 }}>
          <MediaGallery items={mediaGallery} />
          <Text marginT-15 text70 center>
            {productData?.name}
          </Text>
          <Text text70 center>
            {priceStringFromPriceRange(price)}
          </Text>
          {renderOptions()}
          {!!productData && (
            <View paddingH-15>
              <HTML
                source={{ html: productData?.description.html }}
                contentWidth={screenWidth}
                baseFontStyle={{ fontSize: 15 }}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableRipple
        enabled={!addProductLoading}
        color="black"
        rippleColor="rgba(255, 255, 255, 0.2)"
        onPress={onAddToCartPress}>
        <View height={50} width="100%" absB bg-black center style={{ bottom: insets.bottom }}>
          <View row flex center>
            {addProductLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Icon name="cart" color="white" size={16} />
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
