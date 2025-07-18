import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { screenHeight } from '../../utils/Constants';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
} from 'react-native-gesture-handler';

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
  return (
    <View style={styles.flex2}>
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((tile, colIndex) => (
            <PanGestureHandler
              key={`${rowIndex}-${colIndex}`}
              onGestureEvent={event => {
                // TODO: Implement drag logic
              }}
              onHandlerStateChange={event => {
                // TODO: Implement gesture end logic
              }}
            >
              <View
                style={[
                  styles.tile,
                  tile === null ? styles.emptyTile : styles.activeTile,
                ]}
              />
            </PanGestureHandler>
          ))}
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
});
