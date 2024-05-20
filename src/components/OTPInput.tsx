import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import React, {useEffect, useRef, memo, useMemo, useCallback} from 'react';
import {
  View,
  Pressable,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface OTPInputProps {
  otp: string;
  setOtp: (otp: string) => void;
}

function OTPInputComp({otp, setOtp}: OTPInputProps): React.JSX.Element {
  const lengthInput = 6;
  const inputRef = useRef<TextInput>(null);
  const {colors, styles} = useStyles(createStyles);

  useEffect(() => {
    if (otp.length === lengthInput) {
      inputRef.current?.blur();
    }
  }, [otp, lengthInput]);

  const handleCellPress = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const getBtnContainerStyle = useCallback(
    (index: number): ViewStyle => ({
      width: '14%',
      height: 48,
      borderRadius: 8,
      justifyContent: 'center',
      borderColor: colors.primary,
      backgroundColor:
        index <= otp.length ? colors.background : colors.container,
      borderWidth: index <= otp.length ? 1 : 0,
    }),
    [colors, otp.length],
  );

  const animatedBtn = useMemo(
    (): TextStyle => ({
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '400',
      color: colors.textPrimary,
    }),
    [colors],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.cellContainer}>
        <TextInput
          ref={inputRef}
          value={otp}
          style={styles.input}
          onChangeText={setOtp}
          keyboardType="numeric"
          returnKeyType="done"
          maxLength={lengthInput}
        />
        {Array(lengthInput)
          .fill(null)
          .map((_, index) => (
            <OTPCell
              key={index}
              index={index}
              otp={otp}
              onPress={handleCellPress}
              getBtnContainerStyle={getBtnContainerStyle}
              animatedBtn={animatedBtn}
            />
          ))}
      </View>
    </View>
  );
}

interface OTPCellProps {
  index: number;
  otp: string;
  onPress: () => void;
  getBtnContainerStyle: (index: number) => ViewStyle;
  animatedBtn: TextStyle;
}

const OTPCell = memo(
  ({index, otp, onPress, getBtnContainerStyle, animatedBtn}: OTPCellProps) => {
    return (
      <Pressable onPress={onPress} style={getBtnContainerStyle(index)}>
        <Text style={animatedBtn}>
          {otp && otp.length > index ? otp[index] : ''}
        </Text>
      </Pressable>
    );
  },
);

export const OTPInput = memo(OTPInputComp);

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      marginBottom: 8,
    },
    title: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: colors.textPrimary,
    },
    cellContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    input: {
      position: 'absolute',
      height: 0,
      width: 0,
    },
  });
