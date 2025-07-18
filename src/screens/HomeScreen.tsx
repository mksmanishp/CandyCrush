import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { commonStyles } from '../styles/commonStyles';
import { screenHeight, screenWidth } from '../utils/Constants';
import { useIsFocused } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSound } from '../navigation/SoundContext';

const HomeScreen = () => {
  const isFocused = useIsFocused();

  const translateY = useSharedValue(-200);
  const { playSound } = useSound();

  useEffect(() => {
    if (isFocused) {
      playSound('bg', true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      translateY.value = withTiming(0, {
        duration: 3000,
      });
    }
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <ImageBackground
      source={require('../assets/images/b2.png')}
      style={commonStyles.simpleContainer}
    >
      <Animated.Image
        source={require('../assets/images/banner.png')}
        style={[styles.img, animatedStyle]}
      ></Animated.Image>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  img: {
    width: screenWidth,
    position: 'absolute',
    top: -20,
    height: screenWidth * 0.8,
    resizeMode: 'contain',
  },
});
