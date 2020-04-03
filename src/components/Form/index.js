import React, {useRef, useState, useCallback, useEffect} from 'react';

import {Form as CustomForm} from '@unform/mobile';

import KeyboardEventListener from '../../common/KeyboardEventListener';
import useDebounce from '../../common/useDebounce';

import {Container} from './styles';

export default function Form({
  handleSubmit,
  children,
  inputSelected,
  formRef,
  initialData,
  schema,
  handleKeyboardLayout,
}) {
  const scrollRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const debouncedKeyboard = useDebounce(keyboardHeight, 300);

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
  }, [inputSelected, debouncedKeyboard]);

  const handleScroll = useCallback(event => {
    setOffset(event.nativeEvent.contentOffset.y);
  }, []);

  const handleKeyboardCallback = useCallback(
    ({keyboardHeight: height, layoutAnimationConfig}) => {
      handleKeyboardLayout({height, layoutAnimationConfig});
      setKeyboardHeight(height);
    },
    [handleKeyboardLayout],
  );

  return (
    <Container
      scrollEnabled={debouncedKeyboard > 0}
      showsVerticalScrollIndicator={false}
      ref={scrollRef}
      debouncedKeyboard={debouncedKeyboard}
      onScroll={handleScroll}>
      <KeyboardEventListener callback={handleKeyboardCallback}>
        <CustomForm
          initialData={initialData}
          schema={schema}
          ref={formRef}
          onSubmit={handleSubmit}>
          {children}
        </CustomForm>
      </KeyboardEventListener>
    </Container>
  );
}

Form.defaultProps = {
  handleKeyboardLayout: () => {},
};
