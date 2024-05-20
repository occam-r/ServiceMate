import React, {memo, useState, useCallback, useMemo} from 'react';
import {Button, StyleSheet, View, Alert} from 'react-native';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {InputField, OTPInput} from '@app/components';
import authService from '@app/services/login';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {SCREEN_WIDTH} from '@app/utils/helper';

function Phone(): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);
  const [phoneNumber, setPhoneNumber] = useState<string>('9876598765');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState('123456');

  const sendOtp = useCallback(async () => {
    try {
      const confirmation = await authService.signInWithPhoneNumber(
        '+91' + phoneNumber,
      );
      setCode('');
      setConfirm(confirmation);
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      console.error(error);
    }
  }, [phoneNumber]);

  const confirmCode = useCallback(async () => {
    try {
      await confirm?.confirm(code);
    } catch (error) {
      Alert.alert('Invalid Code', 'The OTP you entered is incorrect.');
      console.error('Invalid code:', error);
    }
  }, [code, confirm]);

  const isPhoneNumberValid = useMemo(
    () => phoneNumber.length === 10 && phoneNumberError === '',
    [phoneNumber, phoneNumberError],
  );

  return (
    <View style={styles.container}>
      <InputField
        label="Phone Number"
        isPhone={true}
        placeholder="Enter Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        error={phoneNumberError}
        keyboardType="phone-pad"
        maxLength={10}
        showCheckIcon
      />
      {confirm && <OTPInput otp={code} setOtp={setCode} />}
      <Button
        disabled={!isPhoneNumberValid}
        title={confirm ? 'Confirm' : 'Send OTP'}
        onPress={confirm ? confirmCode : sendOtp}
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

export default memo(Phone);
