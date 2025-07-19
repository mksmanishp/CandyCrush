import { useRef } from 'react';
import { Animated } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { playSound } from '../../utils/SoundUtility';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  checkForMatches,
  clearMatches,
  fillRandomCandies,
  handleShuffleAndClear,
  hasPossibleMoves,
  shiftDown,
} from './gridUtils';

const useGameLogic = (
  data: any[][],
  setData: (data: any[][]) => void,
  setCollectedCandies?: (candies: any[]) => void,
) => {
  const animatedValues = useRef(
    data.map(row =>
      row.map(tile =>
        tile === null
          ? null
          : {
              x: new Animated.Value(0),
              y: new Animated.Value(0),
            },
      ),
    ),
  ).current;

  const handleSwipe = (
    rowIndex: number,
    colIndex: number,
    direction: 'up' | 'down' | 'left' | 'right',
    setCollectedCandies: (fn: (prevCount: number) => number) => void,
  ) => {
    playSound('candy_shuffle');
    const originalGrid = data.map(row => [...row]);
    let newGrid = data.map(row => [...row]);
    let targetRow = rowIndex;
    let targetCol = colIndex;

    if (direction === 'up') targetRow--;
    else if (direction === 'down') targetRow++;
    else if (direction === 'left') targetCol--;
    else if (direction === 'right') targetCol++;

    const inBounds =
      targetRow >= 0 &&
      targetRow < data.length &&
      targetCol >= 0 &&
      targetCol < data[0].length;

    if (
      inBounds &&
      data[rowIndex][colIndex] !== null &&
      data[targetRow][targetCol] !== null
    ) {
      const animate = Animated.parallel([
        Animated.timing(animatedValues[targetRow][targetCol]!.x, {
          toValue: (colIndex - targetCol) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues[targetRow][targetCol]!.y, {
          toValue: (rowIndex - targetRow) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues[rowIndex][colIndex]!.x, {
          toValue: (targetCol - colIndex) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues[rowIndex][colIndex]!.y, {
          toValue: (targetRow - rowIndex) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        }),
      ]);

      animate.start(async () => {
        // Swap tiles
        [newGrid[rowIndex][colIndex], newGrid[targetRow][targetCol]] = [
          newGrid[targetRow][targetCol],
          newGrid[rowIndex][colIndex],
        ];

        let matches = await checkForMatches(newGrid);
        let totalClearedCandies = 0;

        if (matches.length > 0) {
          while (matches.length > 0) {
            playSound('candy_clear');
            totalClearedCandies += matches.length;
            newGrid = await clearMatches(newGrid, matches);
            newGrid = await shiftDown(newGrid);
            newGrid = await fillRandomCandies(newGrid);
            matches = await checkForMatches(newGrid);
          }

          // Reset tile animations
          animatedValues[rowIndex][colIndex]!.x.setValue(0);
          animatedValues[rowIndex][colIndex]!.y.setValue(0);
          animatedValues[targetRow][targetCol]!.x.setValue(0);
          animatedValues[targetRow][targetCol]!.y.setValue(0);

          let hasMoves = await hasPossibleMoves(newGrid);
          while (!hasMoves) {
            const result = await handleShuffleAndClear(newGrid);
            newGrid = result.grid;
            totalClearedCandies += result.clearedMatching;
            hasMoves = await hasPossibleMoves(newGrid);
          }

          setData(newGrid);
          setCollectedCandies(prev => prev + totalClearedCandies);
        } else {
          // No match – reset
          animatedValues[rowIndex][colIndex]!.x.setValue(0);
          animatedValues[rowIndex][colIndex]!.y.setValue(0);
          animatedValues[targetRow][targetCol]!.x.setValue(0);
          animatedValues[targetRow][targetCol]!.y.setValue(0);
          setData(originalGrid);
        }
      });
    }

    console.log(`Swiped ${direction} at [${rowIndex}, ${colIndex}]`);
  };

  const handleGesture = async (
    event: any,
    rowIndex: number,
    colIndex: number,
    state: any,
    setCollectedCandies: any,
  ) => {
    if (data[rowIndex][colIndex] === null) {
      return;
    }
    if (state === State.END) {
      const { translationX, translationY } = event.nativeEvent;
      const absX = Math.abs(translationX);
      const absY = Math.abs(translationY);

      if (absX > absY) {
        if (translationX > 0) {
          handleSwipe(rowIndex, colIndex, 'right', setCollectedCandies);
        } else {
          handleSwipe(rowIndex, colIndex, 'left', setCollectedCandies);
        }
      } else {
        if (translationY > 0) {
          handleSwipe(rowIndex, colIndex, 'down', setCollectedCandies);
        } else {
          handleSwipe(rowIndex, colIndex, 'up', setCollectedCandies);
        }
      }
    }
  };

  return {
    handleGesture,
    animatedValues,
  };
};

export default useGameLogic;
