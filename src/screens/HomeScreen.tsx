import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
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
import LottieView from 'lottie-react-native';
import ScalePress from '../components/ScalePress';
import { navigate } from '../utils/NavigationUtil';
import Footer from '../components/Footer';

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
      style={commonStyles.container}
    >
      <Animated.Image
        source={require('../assets/images/banner.png')}
        style={[styles.img, animatedStyle]}
      ></Animated.Image>

      <LottieView
        source={require('../assets/animations/bird.json')}
        speed={1}
        loop
        autoPlay
        hardwareAccelerationAndroid
        style={styles.lottieviewLeft}
      />
      <LottieView
        source={require('../assets/animations/bird.json')}
        speed={1}
        loop
        autoPlay
        hardwareAccelerationAndroid
        style={styles.lottieviewRight}
      />
      <ScalePress
        style={styles.playButtonConatiner}
        onPress={() => navigate('LevelScreen')}
      >
        <Image
          source={require('../assets/icons/play.png')}
          style={styles.playButton}
        />
      </ScalePress>

      <Footer />
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
  lottieviewLeft: {
    width: 200,
    height: 200,
    position: 'absolute',
    left: -20,
    top: '35%',
    transform: [{ scaleX: -1 }],
  },
  lottieviewRight: {
    width: 200,
    height: 200,
    position: 'absolute',
    right: -20,
    bottom: '50%',
    transform: [{ scaleX: 1 }],
  },
  playButton: {
    resizeMode: 'contain',
    width: screenWidth * 0.5,
    height: screenWidth * 0.2,
  },
  playButtonConatiner: {
    marginTop: 200,
  },
});
