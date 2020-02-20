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
import MaskedInput from './components/MaskedInput';

const schema = Yup.object().shape({
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

  const handleSubmit = useCallback(async (data, {reset}) => {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      Alert.alert(JSON.stringify(data));

      reset();
    } catch (err) {
      const errors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.map(error => {
          errors[error.path] = error.message;
        });

        formRef.current.setErrors(errors);
      }
    }
  }, []);

  const focusNextInput = useCallback(inputName => {
    const inputRef = formRef.current.getFieldRef(inputName);

    // To handle MaskedInput the same way TextInput, we need to check the props to get the
    // _inputElement's reference.
    if ('type' in inputRef.props) {
      formRef.current.getFieldRef(inputName)._inputElement.focus();
    } else {
      formRef.current.getFieldRef(inputName).focus();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Form ref={formRef} onSubmit={handleSubmit}>
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
          <MaskedInput
            mask="cpf"
            name="cpf"
            placeholder="User's CPF"
            keyboardType="number-pad"
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
