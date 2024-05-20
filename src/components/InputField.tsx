import React, {memo, useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TextInputProps,
} from 'react-native';
import {Icon} from '@app/components';
import {TColors} from '@app/theme/Colors';
import useStyles from '@app/theme/useStyles';
import {moderateHScale, moderateVScale} from '@app/utils/helper';
import images from '@app/assets/images';

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  onSecureTextEntryToggle?: () => void;
  keyboardType?: TextInputProps['keyboardType'];
  maxLength?: number;
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: () => void;
  showCheckIcon?: boolean;
  isPhone?: boolean;
  containerStyle?: Record<string, unknown>;
  inputStyle?: Record<string, unknown>;
  errorStyle?: Record<string, unknown>;
}

function InputFieldComp({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  onSecureTextEntryToggle,
  keyboardType,
  maxLength,
  returnKeyType,
  onSubmitEditing,
  showCheckIcon,
  isPhone,
  containerStyle,
  inputStyle,
  errorStyle,
  ...props
}: InputFieldProps): React.JSX.Element {
  const {colors, styles} = useStyles(createStyles);
  const inputRef = useRef<TextInput | null>(null);

  const handleSubmitEditing = useCallback(() => {
    if (onSubmitEditing) {
      onSubmitEditing();
    } else {
      inputRef.current?.blur();
    }
  }, [onSubmitEditing]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setNativeProps({style: [styles.input, inputStyle]});
    }
  }, [inputStyle, styles.input]);

  return (
    <>
      {label && <Text style={styles.heading}>{label}</Text>}
      <View style={[styles.inputContainer, containerStyle]}>
        {icon && <Icon name={icon} />}
        {isPhone && (
          <>
            <Image
              source={images.indian_flag}
              resizeMode="contain"
              style={styles.flag}
            />
            <Text style={styles.countryCode}>+91</Text>
          </>
        )}
        {(icon || isPhone) && <View style={styles.divider} />}
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={colors.shadow}
          value={value}
          style={[styles.input, inputStyle]}
          keyboardType={keyboardType}
          cursorColor={colors.primary}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onSubmitEditing={handleSubmitEditing}
          {...props}
        />
        {showCheckIcon && !error && value.length > 0 && (
          <Icon name="checkmark-circle" color={colors.primary} />
        )}
        {!showCheckIcon && (
          <Text
            suppressHighlighting
            onPress={onSecureTextEntryToggle}
            style={styles.rightIcon}>
            {secureTextEntry ? 'Show' : 'Hide'}
          </Text>
        )}
      </View>
      <View style={[styles.errorContainer, errorStyle]}>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </>
  );
}

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    heading: {
      color: colors.textPrimary,
      fontSize: moderateHScale(16),
      fontWeight: '500',
      padding: '2%',
    },
    inputContainer: {
      flexDirection: 'row',
      height: moderateVScale(45),
      borderRadius: moderateHScale(12),
      paddingHorizontal: '2%',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderWidth: moderateHScale(1),
      borderColor: colors.shadow,
    },
    divider: {
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
      minHeight: '8%',
      paddingTop: moderateVScale(4),
      paddingHorizontal: '2%',
    },
    error: {
      color: colors.error,
      fontSize: moderateHScale(12),
    },
    rightIcon: {
      fontSize: moderateHScale(12),
      fontWeight: '400',
      alignSelf: 'center',
      marginRight: '2%',
      color: colors.textPrimary,
      opacity: 0.75,
    },
    flag: {
      width: moderateHScale(24),
      height: moderateHScale(16),
      marginRight: moderateHScale(8),
    },
    countryCode: {
      color: colors.textPrimary,
      fontSize: moderateHScale(16),
      marginRight: moderateHScale(8),
    },
  });

export const InputField = memo(InputFieldComp);
