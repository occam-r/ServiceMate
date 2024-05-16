import {StatusBarStyle} from 'react-native';

export type ColorTheme = {
  background: string;
  container: string;
  primary: string;
  secondary: string;
  textPrimary: string;
  textSecondary: string;
  iconPrimary: string;
  iconSecondary: string;
  error: string;
  success: string;
  shadow: string;
  border: string;
  warning: string;
  outline: string;
  mineBubble: string;
  otherBubble: string;
  statusBar: StatusBarStyle;
};

const sharedColors = {
  black: '#000000',
  white: '#FFFFFF',
  green: '#2DD7AE',
  red: 'rgb(186, 26, 26)',
};

type SharedColors = typeof sharedColors;

export type TColors = ColorTheme & SharedColors;

type ColorPalettes = Record<'light' | 'dark', TColors>;

const Colors: ColorPalettes = {
  light: {
    background: '#F5f5f5',
    container: '#E0E0E0',
    primary: '#0079FD',
    secondary: '#F92460',
    textPrimary: '#1F1750',
    textSecondary: '#9D5DB0',
    iconPrimary: '#1F1750',
    iconSecondary: '#9D5DB0',
    shadow: 'rgb(0, 0, 0)',
    outline: 'rgb(159, 140, 141)',
    error: sharedColors.red,
    success: sharedColors.green,
    border: 'rgba(82, 133, 162, 0.25)',
    warning: '#F9D1008C',
    mineBubble: '#3581F3',
    otherBubble: '#E0E0E0',
    statusBar: 'dark-content',
    ...sharedColors,
  },
  dark: {
    background: '#313131',
    container: '#202020',
    primary: '#0079FD',
    secondary: '#F92460',
    textPrimary: '#F3F1FB',
    textSecondary: '#67686E',
    iconPrimary: '#F3F1FB',
    iconSecondary: '#67686E',
    shadow: 'rgb(255,255,255)',
    outline: 'rgb(132, 115, 116)',
    error: sharedColors.red,
    success: sharedColors.green,
    border: '#CBD2FA',
    warning: '#F9D1008C',
    mineBubble: '#3581F3',
    otherBubble: '#4F4F4F',
    statusBar: 'light-content',
    ...sharedColors,
  },
};

export default Colors;
