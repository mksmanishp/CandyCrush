import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { commonStyles } from '../styles/commonStyles';
import { levelStyles } from '../styles/levelStyles';
import ScalePress from '../components/ScalePress';
import { goBack, navigate } from '../utils/NavigationUtil';
import { useLevelStore } from '../state/useLevelStore';
import { gameLevels } from '../utils/data';

const LevelScreen = () => {
  const { levels } = useLevelStore();

  const levelPresshnadler = (id: string) => {
    const levelKey = `level${id}` as keyof GameLevels;
    const level = gameLevels[levelKey];
    navigate('GameScreen', {
      level: { ...level, id: id },
    });
  };

  const renderItem = ({ item }: any) => {
    const opacity = item?.unlocked ? 1 : 0.5;
    const emoji = item?.completed ? '✅' : item?.unlocked ? '✌️' : '🔒'; // or any other default emoji

    return (
      <ScalePress
        style={levelStyles.levelItem}
        onPress={() => {
          if (item?.unlocked) {
            levelPresshnadler(item?.id);
            // Navigate to level or perform action
            console.log('Level pressed:', item.id);
          }
        }}
      >
        <View style={{ opacity }}>
          <Text style={levelStyles.levelText}>{emoji}</Text>
          <Text style={levelStyles.levelText}>Level {item.id}</Text>
          {item?.highScore > 0 && (
            <Text style={levelStyles.highScoreText}>HS: {item.highScore}</Text>
          )}
        </View>
      </ScalePress>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/forest.jpeg')}
      style={commonStyles.container}
    >
      <SafeAreaView />
      <View style={levelStyles.flex1}>
        <ScalePress onPress={() => goBack()}>
          <Image
            source={require('../assets/icons/back.png')}
            style={levelStyles.backIcon}
          />
        </ScalePress>
        <ImageBackground
          source={require('../assets/images/lines.jpg')}
          style={levelStyles.levelContainer}
        >
          <View style={levelStyles.subLevelContainer}>
            <FlatList
              data={levels}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={levelStyles.columnWrapper}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={
                <View style={levelStyles.comingSoonContainer}>
                  <Image
                    source={require('../assets/images/doddle.png')}
                    style={levelStyles.doddle}
                  />
                  <Text style={levelStyles.comingSoonText}>
                    Coming Soon! New Levels
                  </Text>
                </View>
              }
            />
          </View>
        </ImageBackground>

        <View style={levelStyles.flex2}>
          <Text style={levelStyles.text}>
            Rule: Collect the minimum amount of candy before the time runs out!
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LevelScreen;

const styles = StyleSheet.create({});
