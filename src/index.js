import React, {useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Scope} from '@unform/core';
import {Form} from '@unform/mobile';

import Yup from './config/yup';

import Input from './components/Input';

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
  documents: Yup.object().shape({
    birthday: Yup.string().required(),
    cpf: Yup.string()
      .required()
      .cpf(),
  }),
});

export default function App() {
  const formRef = useRef(null);

  const handleSubmit = useCallback(async (data, {reset}) => {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      Alert.alert(JSON.stringify(data));

      reset();
    } catch (err) {
      Alert.alert(JSON.stringify(err));
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }, []);

  const focusNextInput = useCallback(inputName => {
    formRef.current.getFieldRef(inputName).focus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Form ref={formRef} schema={schema} onSubmit={handleSubmit}>
        <Input
          autoCorrect={false}
          name="email"
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
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
          <Input
            name="cpf"
            placeholder="User's CPF"
            keyboardType="number-pad"
            returnKeyType="next"
            onSubmitEditing={() => focusNextInput('documents.birthday')}
          />

          <Input
            name="birthday"
            placeholder="User's birthday"
            keyboardType="number-pad"
            returnKeyType="done"
            onSubmitEditing={() => formRef.current.submitForm()}
          />
        </Scope>

        <TouchableOpacity onPress={() => formRef.current.submitForm()}>
          <Text>Save</Text>
        </TouchableOpacity>
      </Form>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
});
