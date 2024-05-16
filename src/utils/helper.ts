import {Dimensions, PixelRatio, Platform} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

// Default guideline sizes are based on standard ~6" (figma design) screen mobile device

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

export const horizontalScale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      (shortDimension / guidelineBaseWidth) * size,
    ),
  );

export const verticalScale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      (longDimension / guidelineBaseHeight) * size,
    ),
  );

export const moderateHScale = (size: number, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(
    size + (horizontalScale(size) - size) * factor,
  );

export const moderateVScale = (size: number, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (verticalScale(size) - size) * factor);

export const IS_AOS = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_WOS = Platform.OS === 'web';

export const CONTENT_RADIUS = moderateHScale(24);
export const CONTENT_PADDING = moderateHScale(20);
