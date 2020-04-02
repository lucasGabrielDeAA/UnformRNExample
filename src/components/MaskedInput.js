import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {useField} from '@unform/core';

export default function MaskedInput({name, label, placeholder, mask, ...rest}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  const [currentValue, setCurrentValue] = useState('');

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
        style={error ? styles.inputError : styles.input}
        ref={inputRef}
        placeholder={placeholder}
        value={currentValue}
        defaultValue={defaultValue}
        onChangeText={v => setCurrentValue(v)}
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
    borderRadius: 5,
    borderWidth: 1,
    color: '#444',
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  inputError: {
    borderColor: '#f00',
    borderRadius: 5,
    borderWidth: 1,
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
});
