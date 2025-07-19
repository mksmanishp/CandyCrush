import { StyleSheet, View, Animated } from 'react-native';
import React, { FC } from 'react';
import { screenHeight } from '../../utils/Constants';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

import { getCandyImage } from '../../utils/data';
import useGameLogic from '../Gamelogic/useGameLogic';

interface GameTileProps {
  data: any[][];
  setData: (data: any) => any;
  setCollectedCandies: (data: any) => any;
}

const GameTile: FC<GameTileProps> = ({
  data,
  setData,
  setCollectedCandies,
}) => {
  const { handleGesture, animatedValues } = useGameLogic(data, setData);

  return (
    <View style={styles.flex2}>
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((tile, colIndex) => {
            const isEmpty = tile === null;
            const animatedValue = animatedValues?.[rowIndex]?.[colIndex];

            return (
              <PanGestureHandler
                key={`${rowIndex}-${colIndex}`}
                onGestureEvent={event =>
                  handleGesture(
                    event,
                    rowIndex,
                    colIndex,
                    State.ACTIVE,
                    setCollectedCandies,
                  )
                }
                onHandlerStateChange={event =>
                  handleGesture(
                    event,
                    rowIndex,
                    colIndex,
                    event?.nativeEvent?.state,
                    setCollectedCandies,
                  )
                }
              >
                <View
                  style={[
                    styles.tile,
                    isEmpty ? styles.emptyTile : styles.activeTile,
                  ]}
                >
                  {!isEmpty && (
                    <Animated.Image
                      source={getCandyImage(tile)}
                      style={[
                        styles.candy,
                        animatedValue
                          ? {
                              transform: [
                                { translateX: animatedValue.x },
                                { translateY: animatedValue.y },
                              ],
                            }
                          : {},
                      ]}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </PanGestureHandler>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default gestureHandlerRootHOC(GameTile);

const styles = StyleSheet.create({
  flex2: {
    height: screenHeight * 0.75,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    width: RFPercentage(5.5),
    height: RFPercentage(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  emptyTile: {
    backgroundColor: 'transparent',
  },
  activeTile: {
    backgroundColor: '#32E9A1',
    borderWidth: 0.6,
    borderColor: '#666',
  },
  candy: {
    width: '90%',
    height: '90%',
  },
});
