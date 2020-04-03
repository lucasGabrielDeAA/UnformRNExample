import React, {useRef, useEffect, useState, useCallback} from 'react';
import {useField} from '@unform/core';

import {Container, CustomInput, Error} from './styles';

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
  const [active, setActive] = useState(false);

  const handleInputFocus = useCallback(() => {
    handleFocus();
    setActive(true);
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
      <CustomInput
        active={active}
        error={error}
        multiline={multiline}
        underlineColorAndroid="transparent"
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onFocus={() => handleInputFocus()}
        onBlur={() => setActive(false)}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
}
