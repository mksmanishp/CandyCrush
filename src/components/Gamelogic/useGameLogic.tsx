import { useRef } from 'react';
import { Animated } from 'react-native';

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
  );

  const handleGesture = async ({
    event,
    rowIndex,
    colIndex,
    state,
  }: {
    event: any;
    rowIndex: number;
    colIndex: number;
    state: any;
  }) => {
    // TODO: Gesture logic here
    // You can use: setData([...]), animatedValues.current[rowIndex][colIndex], setCollectedCandies?.([...])
  };

  return {
    handleGesture,
    animatedValues,
  };
};

export default useGameLogic;
