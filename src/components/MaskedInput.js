import React, {useRef, useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {useField} from '@unform/core';

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
    <View style={styles.container}>
      <TextInputMask
        underlineColorAndroid="transparent"
        type={mask}
        style={
          active ? styles.active : error ? styles.inputError : styles.input
        }
        ref={inputRef}
        placeholder={placeholder}
        value={currentValue}
        defaultValue={defaultValue}
        onChangeText={v => setCurrentValue(v)}
        onFocus={() => handleInputFocus()}
        onBlur={() => setActive(false)}
        {...rest}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 15,
    width: '100%',
  },

  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderWidth: 0,
    color: '#444',
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  inputError: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#f00',
    borderWidth: 0,
    color: '#444',
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  error: {
    color: '#f00',
    fontSize: 15,
    marginTop: 5,
  },

  active: {
    borderBottomWidth: 1 + StyleSheet.hairlineWidth,
    borderColor: '#0050ff',
    borderWidth: 0,
    color: '#444',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 13,
  },
});
