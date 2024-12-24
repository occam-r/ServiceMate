import React, {useCallback, useState} from 'react';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {InputField} from '@app/components';

function AddUser(): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');

  const handleEmailChange = useCallback((text: string) => {
    setEmailAddress(text);
    setEmailAddressError('');
  }, []);

  const handlePhoneChange = useCallback((text: string) => {
    setPhoneNumber(text);
    setPhoneNumberError('');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <InputField
          label="Technician Name"
          icon="person-outline"
          placeholder="Enter Technician Name"
          value={emailAddress}
          onChangeText={handleEmailChange}
          error={emailAddressError}
          keyboardType="name-phone-pad"
          returnKeyType="next"
          showCheckIcon
        />
        <InputField
          label="Phone Number"
          isPhone={true}
          placeholder="Enter Number"
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          error={phoneNumberError}
          keyboardType="phone-pad"
          maxLength={10}
          showCheckIcon
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    scrollContainer: {
      paddingHorizontal: '5%',
    },
  });

export default AddUser;
