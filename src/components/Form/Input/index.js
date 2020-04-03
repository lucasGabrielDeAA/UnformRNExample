import React, {useRef, useEffect, useState, useCallback} from 'react';
import {useField} from '@unform/core';

import {Container, CustomInput, Error, Label} from './styles';

export default function Input({
  name,
  label,
  placeholder,
  multiline,
  handleFocus,
  ...rest
}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);
  const [focused, setFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    handleFocus();
    setFocused(true);
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
    <Container>
      <Label show={focused}>{placeholder}</Label>

      <CustomInput
        focused={focused}
        error={error}
        multiline={multiline}
        underlineColorAndroid="transparent"
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onFocus={() => handleInputFocus()}
        onBlur={() => setFocused(false)}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
}
