import React, {useRef, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Scope} from '@unform/core';

import Yup from './config/yup';

import {Form} from '@unform/mobile';
import Input from './components/Input';
import MaskedInput from './components/MaskedInput';

import KeyboardEventListener from './common/KeyboardEventListener';

import './config/ReactotronConfig';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  age: Yup.number(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
  documents: Yup.object().shape({
    birthday: Yup.string().required(),
    cpf: Yup.string()
      .cpf()
      .required(),
  }),
});

export default function App() {
  const formRef = useRef(null);
  const scrollRef = useRef(null);

  const [inputSelected, setInputSelected] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(-1);
  const [offset, setOffset] = useState(0);

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

  const handleSubmit = useCallback(async (data, {reset}) => {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      Alert.alert(JSON.stringify(data));

      reset();
    } catch (err) {
      // const errors = {};
      // if (err instanceof Yup.ValidationError) {
      //   err.inner.map(error => {
      //     errors[error.path] = error.message;
      //   });
      //   formRef.current.setErrors(errors);
      // }
    }
  }, []);

  const handleCallback = useCallback(({keyboardHeight: height}) => {
    // if (height !== 0) {
    setKeyboardHeight(height);
    // }
  }, []);

  const scrollToInput = useCallback(inputName => {
    setInputSelected(inputName);
  }, []);

  const focusNextInput = useCallback(inputName => {
    formRef.current.getFieldRef(inputName).focus();
  }, []);

  const handleScroll = useCallback(event => {
    setOffset(event.nativeEvent.contentOffset.y);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.content}
        contentContainerStyle={{
          ...styles.contentContainer,
          paddingBottom: keyboardHeight,
        }}
        onScroll={handleScroll}>
        <KeyboardEventListener callback={handleCallback}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCorrect={false}
              name="name"
              placeholder="Name"
              autoCapitalize="none"
              returnKeyType="next"
              onFocus={() => scrollToInput('name')}
              onSubmitEditing={() => focusNextInput('email')}
            />

            <Input
              autoCorrect={false}
              name="email"
              placeholder="E-mail"
              autoCapitalize="none"
              // keyboardType="email-address"
              returnKeyType="next"
              onFocus={() => scrollToInput('email')}
              onSubmitEditing={() => focusNextInput('age')}
            />

            <Input
              autoCorrect={false}
              name="age"
              placeholder="Age"
              autoCapitalize="none"
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={() => focusNextInput('password')}
            />

            <Input
              secureTextEntry
              autoCorrect={false}
              name="password"
              placeholder="Password"
              returnKeyType="next"
              onSubmitEditing={() => focusNextInput('documents.cpf')}
            />

            <Scope path="documents">
              <MaskedInput
                mask="cpf"
                name="cpf"
                placeholder="User's CPF"
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={() => focusNextInput('documents.birthday')}
              />

              <MaskedInput
                mask="datetime"
                name="birthday"
                placeholder="User's birthday"
                keyboardType="number-pad"
                returnKeyType="done"
                options={{
                  format: 'DD/MM/YYYY',
                }}
                onSubmitEditing={() => formRef.current.submitForm()}
                onBlur={() => setKeyboardHeight(0)}
              />
            </Scope>

            <TouchableOpacity onPress={() => formRef.current.submitForm()}>
              <Text>Save</Text>
            </TouchableOpacity>
          </Form>
        </KeyboardEventListener>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  content: {
    width: '100%',
  },
  contentContainer: {
    paddingTop: 500,
  },
});
