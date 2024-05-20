import React from 'react';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

function Users({navigation}): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Add Technician"
        onPress={() => navigation.navigate('AddUser')}
      />
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

export default Users;
