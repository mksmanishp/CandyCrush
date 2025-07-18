import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { commonStyles } from '../styles/commonStyles';
import GameHeader from '../components/Game/GameHeader';

const GameScreen = () => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTimer] = useState<any>(null);
  const [collectedCandies, setcollectedCandies] = useState<number>(0);

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
    </ImageBackground>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
