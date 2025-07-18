import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FONTS } from '../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

const Footer = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.textm}>Made by</Text>
        <Text style={styles.textn}>Manish kumar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  textm: {
    fontFamily: FONTS.twinkle,
    fontSize: RFValue(12),
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  textn: {
    fontFamily: FONTS.Sedgwick,
    fontSize: RFValue(16),
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
});
