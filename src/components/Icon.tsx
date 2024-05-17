import useColors from '@app/theme/useColors';
import {moderateHScale} from '@app/utils/helper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {memo} from 'react';
import {TextProps} from 'react-native';

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

function IconCompo({
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
