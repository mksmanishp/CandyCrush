import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC } from 'react';
import {
  FONTS,
  formatTime,
  screenHeight,
  screenWidth,
} from '../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

const GameHeader: FC<{
  totalCount: number;
  time: number;
  collectedCandies: number;
}> = ({ time, totalCount, collectedCandies }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Image
        source={require('../../assets/icons/hangrope.png')}
        style={styles.img}
      />
      <ImageBackground
        source={require('../../assets/images/lines.jpg')}
        style={styles.lines}
      >
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.candiesText}>
              🍭 {collectedCandies} /
              <Text style={styles.totalCandiesText}>{totalCount}</Text>
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timerText}>⏰{formatTime(time)}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default GameHeader;

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.11,
    width: '100%',
  },
  img: {
    width: RFValue(60),
    height: RFValue(40),
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 2,
    top: -RFValue(0),
    alignSelf: 'center',
  },
  lines: {
    padding: 5,
    borderRadius: 10,
    resizeMode: 'contain',
    overflow: 'hidden',
    margin: RFValue(10),
    marginTop: RFValue(20),
  },
  subContainer: {
    backgroundColor: 'red',
    padding: RFValue(5),
    borderRadius: RFValue(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c2978f',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  candiesText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.Lily, // ensure this font exists
    color: '#3A0E4C',
  },
  totalCandiesText: {
    fontSize: RFValue(12),
    fontFamily: FONTS.Lily, // typo fixed from `FONTS.Lily,` to correct key
    color: '#3A0E4C',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c2978f',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  timerText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.Lily, // Ensure FONTS.Lily is defined
    color: '#5B2333',
  },
});
