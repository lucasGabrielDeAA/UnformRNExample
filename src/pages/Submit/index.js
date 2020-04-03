import React, {useRef, useCallback, useState} from 'react';
import {Alert, Button} from 'react-native';

import {Scope} from '@unform/core';

import Yup from '../../config/yup';

import Form from '../../components/Form';
import Input from '../../components/Form/Input';
import MaskedInput from '../../components/Form/MaskedInput';

import {Container, TopImage} from './styles';

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

export default function Submit() {
  const formRef = useRef(null);

  const [inputSelected, setInputSelected] = useState('');

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

  const scrollToFocusedInput = useCallback(inputName => {
    setInputSelected(inputName);
  }, []);

  const focusNextInput = useCallback(inputName => {
    formRef.current.getFieldRef(inputName).focus();
  }, []);

  return (
    <Container>
      <Form
        formRef={formRef}
        handleSubmit={handleSubmit}
        inputSelected={inputSelected}
        initialData={{
          name: 'vinicius',
          email: 'vini@catafesta@gmail.com',
          age: '23',
          password: '123456',
          cpf: '11111111111',
          birthday: '11111995',
        }}>
        <TopImage
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
          }}
        />
        <Input
          autoCorrect={false}
          name="name"
          placeholder="Name"
          autoCapitalize="none"
          returnKeyType="next"
          handleFocus={() => scrollToFocusedInput('name')}
          onSubmitEditing={() => focusNextInput('email')}
        />

        <Input
          autoCorrect={false}
          name="email"
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          handleFocus={() => scrollToFocusedInput('email')}
          onSubmitEditing={() => focusNextInput('age')}
        />

        <Input
          autoCorrect={false}
          name="age"
          placeholder="Age"
          autoCapitalize="none"
          keyboardType="numeric"
          returnKeyType="done"
          handleFocus={() => scrollToFocusedInput('age')}
          onSubmitEditing={() => focusNextInput('password')}
        />

        <Input
          secureTextEntry
          autoCorrect={false}
          name="password"
          placeholder="Password"
          returnKeyType="next"
          handleFocus={() => scrollToFocusedInput('password')}
          onSubmitEditing={() => focusNextInput('documents.cpf')}
        />

        <Scope path="documents">
          <MaskedInput
            mask="cpf"
            name="cpf"
            placeholder="User's CPF"
            keyboardType="numeric"
            returnKeyType="done"
            handleFocus={() => scrollToFocusedInput('documents.cpf')}
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
            handleFocus={() => scrollToFocusedInput('documents.birthday')}
            onSubmitEditing={() => formRef.current.submitForm()}
          />
        </Scope>

        <Button title="Save" onPress={() => formRef.current.submitForm()} />
      </Form>
    </Container>
  );
}
