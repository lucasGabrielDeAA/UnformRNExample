import React, {useRef, useEffect, useState, useCallback} from 'react';
import {useField} from '@unform/core';

import {Container, StyledInput, Error} from './styles';

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
  const [active, setActive] = useState(false);

  const handleInputFocus = useCallback(() => {
    handleFocus();
    setActive(true);
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
      <StyledInput
        underlineColorAndroid="transparent"
        type={mask}
        active={active}
        error={error}
        ref={inputRef}
        placeholder={placeholder}
        value={currentValue}
        defaultValue={defaultValue}
        onChangeText={v => setCurrentValue(v)}
        onFocus={() => handleInputFocus()}
        onBlur={() => setActive(false)}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
}
