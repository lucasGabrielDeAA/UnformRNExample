import React, {useRef, useEffect, useCallback} from 'react';
import {useField} from '@unform/core';

import {Container, StyledInput, Error} from './styles';

export default function CustomInput({
  name,
  label,
  placeholder,
  multiline,
  handleFocus,
  ...rest
}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  const handleInputFocus = useCallback(() => {
    handleFocus();
  }, [handleFocus]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({text: value});
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({text: ''});
        ref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container multiline={multiline}>
      <StyledInput
        multiline={multiline}
        underlineColorAndroid="transparent"
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onFocus={() => handleInputFocus()}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
}
