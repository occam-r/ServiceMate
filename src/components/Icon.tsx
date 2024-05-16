import React, {memo} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {TextProps} from 'react-native';
import {moderateHScale} from '@utils/helper';
import useColors from '@theme/useColors';

const IconName: {[key: string]: React.ComponentType<any>} = {
  Ionicons,
};

export type IconType = keyof typeof IconName;

const DEFAULT_NAME = 'add';
const DEFAULT_TYPE = 'Ionicons';
const DEFAULT_SIZE = moderateHScale(25);

interface IconProps extends TextProps {
  name?: string;
  type?: IconType;
  size?: number;
  color?: string;
}

export function IconCompo({
  name = DEFAULT_NAME,
  type = DEFAULT_TYPE,
  size = DEFAULT_SIZE,
  color,
  ...other
}: IconProps): React.JSX.Element {
  const {
    colors: {iconPrimary},
  } = useColors();

  const Component = IconName[type];

  if (!Component) {
    console.warn(`Invalid icon type: ${type}`);
    return <></>;
  }

  return (
    <Component
      {...other}
      name={name}
      size={size}
      color={color || iconPrimary}
    />
  );
}
export const Icon = memo(IconCompo);
