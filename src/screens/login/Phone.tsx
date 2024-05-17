import images from '@app/assets/images';
import {Icon} from '@app/components';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {
  SCREEN_WIDTH,
  horizontalScale,
  moderateHScale,
  moderateVScale,
} from '@app/utils/helper';
import React, {memo, useRef, useState} from 'react';
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type PhoneProps = {
  title: string;
};

function Phone({title}: PhoneProps): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);
  const inputRef = useRef<TextInput>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Phone Number</Text>
      <View style={styles.inputContainer}>
        <Image
          source={images.indian_flag}
          resizeMode="contain"
          style={styles.flag}
        />
        <Text style={styles.countryCode}>+91</Text>
        <View style={styles.devider} />
        <TextInput
          ref={inputRef}
          placeholder="Enter Number"
          placeholderTextColor={colors.shadow}
          value={phoneNumber}
          style={styles.input}
          keyboardType="phone-pad"
          cursorColor={colors.primary}
          maxLength={10}
          onChangeText={setPhoneNumber}
        />
        {phoneNumber.length === 10 && !phoneNumberError && (
          <Icon name="checkmark-circle" color={colors.primary} />
        )}
      </View>
      <View style={styles.errorContainer}>
        {phoneNumberError && (
          <Text style={styles.error}>{phoneNumberError}</Text>
        )}
      </View>
      <Button
        disabled={phoneNumber.length !== 10 || phoneNumberError !== ''}
        title="Send OTP"
        onPress={() => {
          // dispatch(generateOtp(phoneNumber));
          // navigationService.navigate('Verify');
        }}
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
    heading: {
      color: colors.textPrimary,
      fontSize: moderateHScale(16),
      fontWeight: '500',
      padding: '2%',
    },
    inputContainer: {
      flexDirection: 'row',
      height: moderateVScale(45),
      borderRadius: moderateHScale(8),
      paddingHorizontal: '2%',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderWidth: moderateHScale(1),
      borderColor: colors.shadow,
    },
    flag: {
      height: '90%',
      width: '8%',
    },
    countryCode: {
      color: colors.textPrimary,
      fontSize: moderateHScale(16),
      letterSpacing: moderateVScale(1),
      paddingHorizontal: '2%',
    },
    devider: {
      height: '60%',
      width: moderateHScale(1),
      backgroundColor: colors.shadow,
      marginHorizontal: '2%',
    },
    input: {
      flex: 1,
      color: colors.textPrimary,
      fontSize: moderateHScale(16),
      letterSpacing: moderateHScale(1),
    },
    errorContainer: {
      height: '15%',
      padding: '2%',
    },
    error: {
      color: colors.error,
      fontSize: moderateHScale(12),
    },
    termText: {
      color: colors.secondary,
      fontSize: moderateHScale(14),
      fontWeight: '500',
      textAlign: 'center',
      padding: '2%',
    },
    termHighlight: {
      color: colors.primary,
      fontWeight: '700',
    },
  });
export default memo(Phone);
