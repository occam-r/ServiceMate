import React, {FC, createContext, useState} from 'react';
import {useColorScheme} from 'react-native';
import Colors, {TColors} from './Colors';

type ThemeContextType = {
  colors: TColors;
  applyColors: (colors: TColors) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

const ThemeProvider: FC<Props> = ({children}) => {
  const colorScheme = useColorScheme();
  const [colors, setColors] = useState(Colors[colorScheme as 'light' | 'dark']);

  const applyColors = (colorTheme: TColors) => {
    setColors(colorTheme);
  };

  return (
    <ThemeContext.Provider value={{applyColors, colors}}>
      {children}
    </ThemeContext.Provider>
  );
};
export {ThemeContext, ThemeProvider};
