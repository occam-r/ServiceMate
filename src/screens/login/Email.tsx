import React, {memo, useState, useCallback} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import {InputField} from '@app/components';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {SCREEN_WIDTH} from '@app/utils/helper';
import authService from '@app/services/login';

function Email(): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);
  const [secure, setSecure] = useState(true);
  const [emailAddress, setEmailAddress] = useState('kashif.dev01@yopmail.com');
  const [emailAddressError, setEmailAddressError] = useState('');
  const [password, setPassword] = useState('P@ssw0rd@123');
  const [passwordError, setPasswordError] = useState('');

  const onLoginPressed = useCallback(() => {
    if (!emailAddress || !password) {
      setEmailAddressError(
        emailAddress ? '' : 'Please enter your email address',
      );
      setPasswordError(password ? '' : 'Please enter your password');
      return;
    }

    authService
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert(
            'Invalid Credential',
            'The supplied auth credential is incorrect',
          );
        }
        console.error(error);
      });
  }, [emailAddress, password]);

  const handleEmailChange = useCallback((text: string) => {
    setEmailAddress(text);
    setEmailAddressError('');
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
    setPasswordError('');
  }, []);

  return (
    <View style={styles.container}>
      <InputField
        label="Email Address"
        icon="mail-open-outline"
        placeholder="Enter Email"
        value={emailAddress}
        onChangeText={handleEmailChange}
        error={emailAddressError}
        keyboardType="email-address"
        returnKeyType="next"
        showCheckIcon
      />
      <InputField
        label="Password"
        icon="lock-closed-outline"
        placeholder="Enter Password"
        value={password}
        onChangeText={handlePasswordChange}
        error={passwordError}
        secureTextEntry={secure}
        onSecureTextEntryToggle={() => setSecure(!secure)}
      />
      <Button
        disabled={emailAddressError !== '' || passwordError !== ''}
        title="Login"
        onPress={onLoginPressed}
      />
    </View>
  );
}

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      width: SCREEN_WIDTH * 0.92,
      marginHorizontal: SCREEN_WIDTH * 0.04,
    },
  });

export default memo(Email);
