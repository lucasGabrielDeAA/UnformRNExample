import React, {useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Scope} from '@unform/core';

import Form from './components/Form';
import Input from './components/Input';

export default function App() {
  const formRef = useRef(null);

  const handleSubmit = useCallback((data, {reset}) => {
    Alert.alert(JSON.stringify(data));

    reset();
  }, []);

  const focusNextInput = useCallback(inputName => {
    formRef.current.getFieldRef(inputName).focus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Form reference={formRef} onSubmit={handleSubmit}>
        <Input
          autoCorrect={false}
          name="email"
          label="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => focusNextInput('name')}
        />

        <Input
          autoCorrect={false}
          name="name"
          label="Name"
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => focusNextInput('address.street')}
        />

        <Scope path="address">
          <Input
            name="street"
            label="Street name"
            returnKeyType="next"
            onSubmitEditing={() => focusNextInput('address.zipcode')}
          />
          <Input name="zipcode" label="ZIP code" keyboardType="number-pad" />
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
