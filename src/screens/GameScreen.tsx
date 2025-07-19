import {
  Alert,
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { commonStyles } from '../styles/commonStyles';
import GameHeader from '../components/Game/GameHeader';
import { useRoute } from '@react-navigation/native';
import { useSound } from '../navigation/SoundContext';
import GameFooter from '../components/Game/GameFooter';
import GameTile from '../components/Game/GameTile';
import { useLevelStore } from '../state/useLevelStore';
import { goBack } from '../utils/NavigationUtil';
import { screenWidth } from '../utils/Constants';
import LottieView from 'lottie-react-native';

const GameScreen = () => {
  const route = useRoute();
  const item = route?.params as any;
  const { playSound } = useSound();
  const [gridData, setGridData] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTimer] = useState<any>(null);
  const [collectedCandies, setcollectedCandies] = useState<number>(0);

  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [firstAnimation, setFirstAnimation] = useState<boolean>(false);

  const { completeLevel, unlockLevel } = useLevelStore();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (item.level) {
      setGridData(item?.level?.grid);
      setTotalCount(item?.level?.pass);
      setTimer(item?.level?.time);
    }
  }, []);

  useEffect(() => {
    if (time === 0) {
      handleGameOver();
    }
  }, [time]);

  useEffect(() => {
    if (time !== null && time > 0) {
      const timeInterval = setInterval(() => {
        setTimer((prev: number) => {
          if (prev === 1000) {
            clearInterval(timeInterval);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => {
        clearTimeout(timeInterval);
      };
    }
  }, [time]);

  useEffect(() => {
    if (collectedCandies >= totalCount && totalCount > 0 && !firstAnimation) {
      setFirstAnimation(true);
      startHeartBeatAnimation();
    }
  }, [collectedCandies, totalCount]);

  const startHeartBeatAnimation = () => {
    playSound('cheer', false);

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
      {
        iterations: 2,
      },
    ).start(() => {
      setFirstAnimation(true);
      setShowAnimation(false);
    });
  };

  const handleGameOver = () => {
    if (collectedCandies >= totalCount) {
      completeLevel(item?.level?.id, collectedCandies);
      unlockLevel(item?.level?.id + 1);
      Alert.alert('Badhai Ho!', 'Level Par Liya hai', [
        { text: 'Agla Level', onPress: () => goBack() },
      ]);
    } else {
      Alert.alert('Game Over!', 'App sare candles collect nahi kar paye!', [
        { text: 'Phew! I will win next rime', onPress: () => goBack() },
      ]);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/b1.png')}
      style={commonStyles.simpleContainer}
    >
      <GameHeader
        totalCount={totalCount}
        collectedCandies={collectedCandies}
        time={time}
      />
      {gridData && (
        <GameTile
          data={gridData}
          setData={setGridData}
          setCollectedCandies={setcollectedCandies}
        />
      )}
      {showAnimation && (
        <>
          <Animated.Image
            source={require('../assets/text/t2.png')}
            style={[
              styles.centerImage,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          />
          <LottieView
            source={require('../assets/animations/confetti.json')}
            style={styles.lottie}
            autoPlay
            loop
          />
        </>
      )}

      <GameFooter />
    </ImageBackground>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  centerImage: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '15%',
  },

  lottie: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '10%',
  },
});
