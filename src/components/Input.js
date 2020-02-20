import React, {useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useField} from '@unform/core';

function Input({name, label, placeholder, ...rest}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

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
    <View style={styles.container}>
      <TextInput
        style={error ? styles.inputError : styles.input}
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
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

export default Input;
