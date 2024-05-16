/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {moderateHScale} from '@app/utils/helper';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

function Home(): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={colors.statusBar}
        backgroundColor={colors.background}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <Text>KASHIF</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    headerBackground: {
      flex: 1,
      backgroundColor: colors.background,
      borderBottomWidth: moderateHScale(0.5),
      borderBottomColor: colors.primary,
    },
    drawerStyle: {
      backgroundColor: colors.background,
    },
  });

export default Home;
