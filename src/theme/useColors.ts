import {useContext} from 'react';
import {ThemeContext} from './ThemeContext';
import {TColors} from './Colors';

interface ColorType {
  colors: TColors;
  applyColors: (colors: TColors) => void;
}

const useColors = (): ColorType => {
  const store = useContext(ThemeContext);
  if (!store) {
    throw new Error('useColors must be defined.');
  }

  return {
    applyColors: store.applyColors,
    colors: store.colors,
  };
};

export default useColors;
