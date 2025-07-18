import { FC } from 'react';
import { ViewStyle, Animated, TouchableOpacity } from 'react-native';
import { playSound } from '../utils/SoundUtility';

interface ScalePressProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

const ScalePress: FC<ScalePressProps> = ({ style, onPress, children }) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    playSound('ui');
    Animated.spring(scaleValue, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
      style={{ ...style }}
    >
      <Animated.View
        style={[{ transform: [{ scale: scaleValue }] }, { width: '100%' }]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;
