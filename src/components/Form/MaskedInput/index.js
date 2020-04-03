import React, {useRef, useEffect, useState, useCallback} from 'react';
import {useField} from '@unform/core';

import {Container, StyledInput, Error, Label} from './styles';

export default function MaskedInput({
  name,
  label,
  placeholder,
  mask,
  handleFocus,
  ...rest
}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  const [currentValue, setCurrentValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    handleFocus();
    setFocused(true);
  }, [handleFocus]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current._inputElement,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({text: value});
        ref._lastNativeText = value;
        setCurrentValue(value);
      },
      clearValue(ref) {
        ref.setNativeProps({text: ''});
        ref._lastNativeText = '';
        setCurrentValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Label show={focused}>{placeholder}</Label>

      <StyledInput
        underlineColorAndroid="transparent"
        type={mask}
        focused={focused}
        error={error}
        ref={inputRef}
        placeholder={placeholder}
        value={currentValue}
        defaultValue={defaultValue}
        onChangeText={v => setCurrentValue(v)}
        onFocus={() => handleInputFocus()}
        onBlur={() => setFocused(false)}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
}
