import React, {useEffect, useCallback} from 'react';
import {View} from 'react-native';

import {LayoutAnimation, Keyboard, Platform} from 'react-native';

export default function KeyboardEventListener({callback, children}) {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillChangeFrame', onChangeKeyboard);
    } else {
      Keyboard.addListener('keyboardDidShow', onChangeKeyboard);
      Keyboard.addListener('keyboardDidHide', onChangeKeyboard);
    }

    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);

  const onChangeKeyboard = useCallback(
    event => {
      if (!event) {
        callback({keyboardHeight: 0});
        return;
      }

      const {duration, easing, startCoordinates, endCoordinates} = event;

      let keyboardHeight;

      if (
        Platform.OS === 'ios' &&
        endCoordinates.screenY > startCoordinates.screenY
      ) {
        keyboardHeight = 0;
      } else if (
        Platform.OS === 'ios' &&
        endCoordinates.screenY === startCoordinates.screenY
      ) {
        return;
      } else {
        keyboardHeight = endCoordinates.height;
      }

      let layoutAnimationConfig;

      if (duration && easing) {
        layoutAnimationConfig = {
          duration,
          update: {
            duration,
            type: LayoutAnimation.Types[easing] || 'keyboard',
          },
        };
      }

      callback({keyboardHeight, layoutAnimationConfig});
    },
    [callback],
  );

  return <View>{children}</View>;
}
