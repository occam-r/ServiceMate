import React, {useCallback} from 'react';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import authService from '@app/services/login';

function Technician(): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);
  const onLogoutPressed = useCallback(() => {
    authService.signOut().then(() => {
      console.log('Logged out');
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Technician</Text>
      <Button title="Log out" onPress={onLogoutPressed} />
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

export default Technician;
