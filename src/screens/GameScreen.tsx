import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { commonStyles } from '../styles/commonStyles';
import GameHeader from '../components/Game/GameHeader';
import { useRoute } from '@react-navigation/native';
import { useSound } from '../navigation/SoundContext';
import GameFooter from '../components/Game/GameFooter';
import GameTile from '../components/Game/GameTile';

const GameScreen = () => {
  const route = useRoute();
  const item = route?.params as any;
  const { playSound } = useSound();
  const [gridData, setGridData] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTimer] = useState<any>(null);
  const [collectedCandies, setcollectedCandies] = useState<number>(0);

  useEffect(() => {
    if (item.level) {
      setGridData(item?.level?.grid);
      setTotalCount(item?.level?.pass);
      setTimer(item?.level?.time);
    }
  }, []);

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
      <GameFooter />
    </ImageBackground>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
