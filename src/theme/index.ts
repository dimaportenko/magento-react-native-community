import { ThemeManager, Typography } from 'react-native-ui-lib/core';
import { fonts } from './fonts';

export const initTheme = () => {
  Typography.loadTypographies({
    black: {
      fontFamily: fonts.SourceSansProBlack,
    },
    blackItalic: {
      fontFamily: fonts.SourceSansProBlackItalic,
    },
    bold: {
      fontFamily: fonts.SourceSansProBold,
    },
    boldItalic: {
      fontFamily: fonts.SourceSansProBoldItalic,
    },
    extraLight: {
      fontFamily: fonts.SourceSansProExtraLight,
    },
    extraLightItalic: {
      fontFamily: fonts.SourceSansProExtraLightItalic,
    },
    italic: {
      fontFamily: fonts.SourceSansProItalic,
    },
    light: {
      fontFamily: fonts.SourceSansProLight,
    },
    lightItalic: {
      fontFamily: fonts.SourceSansProLightItalic,
    },
    regular: {
      fontFamily: fonts.SourceSansProRegular,
    },
    semiBold: {
      fontFamily: fonts.SourceSansProSemiBold,
    },
    semiBoldItalic: {
      fontFamily: fonts.SourceSansProSemiBoldItalic,
    },
  });

  ThemeManager.setComponentTheme('Text', {
    regular: true,
  });
};
