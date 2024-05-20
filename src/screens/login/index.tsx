import React from 'react';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {moderateHScale} from '@app/utils/helper';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SwitchTab} from '@app/components';
import Phone from './Phone';
import Email from './Email';

function Home(): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={colors.statusBar}
        backgroundColor={styles.container.backgroundColor}
      />
      <View style={styles.tabCont}>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <SwitchTab
        items={['PHONE', 'EMAIL']}
        component={[<Phone />, <Email />]}
      />
      <Text style={styles.termText}>
        By continuing, you agree to our{' '}
        <Text style={styles.termHighlight}>Terms of Service</Text> and{' '}
        <Text style={styles.termHighlight}>Privacy Policy</Text>
      </Text>
    </SafeAreaView>
  );
}

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    tabCont: {
      flexGrow: 1,
    },
    welcomeText: {
      padding: '5%',
      fontWeight: '700',
      fontSize: moderateHScale(30),
      color: colors.textPrimary,
    },
    termText: {
      padding: '5%',
      color: colors.secondary,
      fontSize: moderateHScale(14),
      fontWeight: '500',
      textAlign: 'center',
    },
    termHighlight: {
      color: colors.primary,
      fontWeight: '700',
    },
  });

export default Home;
