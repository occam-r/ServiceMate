import React from 'react';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

function AddUser(): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.container}>
      <Text>AddUser</Text>
    </SafeAreaView>
  );
}

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
  });

export default AddUser;
