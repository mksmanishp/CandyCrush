import React, { FC } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { goBack } from '../../utils/NavigationUtil';
import ScalePress from '../ScalePress';
import { screenHeight } from '../../utils/Constants';

const GameFooter: FC = () => {
  return (
    <View style={styles.flex1}>
      <ScalePress onPress={goBack}>
        <Image
          source={require('../../assets/icons/close.png')}
          style={styles.closeIcon}
        />
      </ScalePress>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    height: screenHeight * 0.1,
    width: '100%',
    paddingHorizontal: 10,
  },
  closeIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
});

export default GameFooter;
