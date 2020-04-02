import React, {useRef, useState, useCallback, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {Form as CustomForm} from '@unform/mobile';

import KeyboardEventListener from '../common/KeyboardEventListener';

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
  contentContainer: {
    paddingTop: 500,
  },
});

export default function Form({handleSubmit, children, inputSelected, formRef}) {
  const scrollRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (inputSelected !== '' && keyboardHeight > 0) {
      formRef.current
        .getFieldRef(inputSelected)
        .measure((fx, fy, width, height, px, py) => {
          scrollRef.current.scrollTo({
            x: 0,
            y: offset + py,
            animated: true,
          });
        });
    }
  }, [inputSelected, keyboardHeight]);

  const handleScroll = useCallback(event => {
    setOffset(event.nativeEvent.contentOffset.y);
  }, []);

  const handleKeyboardCallback = useCallback(({keyboardHeight: height}) => {
    setKeyboardHeight(height);
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollRef}
      style={styles.content}
      contentContainerStyle={{
        ...styles.contentContainer,
        paddingBottom: keyboardHeight,
      }}
      onScroll={handleScroll}>
      <KeyboardEventListener callback={handleKeyboardCallback}>
        <CustomForm ref={formRef} onSubmit={handleSubmit}>
          {children}
        </CustomForm>
      </KeyboardEventListener>
    </ScrollView>
  );
}
