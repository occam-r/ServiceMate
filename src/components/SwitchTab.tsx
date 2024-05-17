import React, {memo, useRef, useState, useCallback, useMemo} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ViewStyle,
  Keyboard,
} from 'react-native';
import {SCREEN_WIDTH, moderateHScale} from '@app/utils/helper';
import useStyles from '@app/theme/useStyles';
import {TColors} from '@app/theme/Colors';

interface SwitchTabProps {
  items: string[];
  component: JSX.Element[];
}

const SwitchTabComp = ({items, component}: SwitchTabProps) => {
  const {colors, styles} = useStyles(createStyles);
  const [btnWidth, setBtnWidth] = useState<number>(0);
  const componentRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const translateX = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0, btnWidth],
  });
  const translateXOpp = scrollX.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0, -btnWidth],
  });

  const changeTab = useCallback(
    (index: number) => {
      Keyboard.dismiss();
      componentRef.current?.scrollToIndex({index});
      Animated.spring(scrollX, {
        toValue: index * btnWidth,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    },
    [btnWidth, scrollX],
  );

  const _renderButton = useCallback(
    (item: string, index: number) => (
      <TouchableOpacity
        key={item}
        activeOpacity={0.9}
        style={styles.itemContainer}
        onPress={() => changeTab(index)}>
        <Text style={styles.barText1}>{item}</Text>
      </TouchableOpacity>
    ),
    [changeTab, styles.barText1, styles.itemContainer],
  );

  const animatedBtnContainer = useMemo(
    (): ViewStyle => ({
      height: '80%',
      width: '50%',
      flexDirection: 'row',
      position: 'absolute',
      overflow: 'hidden',
      backgroundColor: colors.primary,
      borderRadius: moderateHScale(20),
      transform: [{translateX}],
    }),
    [colors.primary, translateX],
  );

  const animatedBtn = useMemo(
    (): ViewStyle => ({
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{translateX: translateXOpp}],
    }),
    [translateXOpp],
  );

  const renderedItems = useMemo(
    () => items.map(_renderButton),
    [items, _renderButton],
  );
  const renderedComponents = useMemo(() => component, [component]);

  return (
    <View style={styles.container}>
      <View
        style={styles.barList}
        onLayout={e => setBtnWidth(e.nativeEvent.layout.width / 2)}>
        {renderedItems}
        <Animated.View style={animatedBtnContainer}>
          {items.map(btn => (
            <Animated.View key={btn} style={animatedBtn}>
              <Text style={styles.barText2}>{btn}</Text>
            </Animated.View>
          ))}
        </Animated.View>
      </View>
      <Animated.FlatList
        horizontal
        pagingEnabled
        ref={componentRef}
        decelerationRate="fast"
        data={renderedComponents}
        removeClippedSubviews={true}
        snapToInterval={SCREEN_WIDTH}
        renderItem={({item}) => item}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
      />
    </View>
  );
};

export const SwitchTab = memo(SwitchTabComp);

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {},
    barList: {
      height: moderateHScale(40),
      width: '60%',
      borderRadius: moderateHScale(20),
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: colors.container,
    },
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    barText1: {
      color: colors.textPrimary,
      fontSize: moderateHScale(14),
      fontWeight: '500',
    },
    barText2: {
      color: colors.background,
      fontSize: moderateHScale(14),
      fontWeight: '500',
    },
  });
