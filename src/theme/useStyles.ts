import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {TColors} from './Colors';
import useColors from './useColors';

interface Styles<T extends StyleSheet.NamedStyles<T>> {
  colors: TColors;
  styles: T;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
  createStyle: (colors: TColors, insets?: EdgeInsets) => T,
): Styles<T> {
  const {colors} = useColors();
  const insets = useSafeAreaInsets();

  return {
    colors: colors,
    styles: useMemo(
      () => createStyle(colors, insets),
      [colors, insets, createStyle],
    ),
  };
}
