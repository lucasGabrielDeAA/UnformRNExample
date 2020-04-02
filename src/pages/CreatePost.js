import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import Form from '../components/Form';
import Input from '../components/Input';

export default function CreatePost() {
  const formRef = useRef(null);

  const [inputSelected, setInputSelected] = useState('');

  const handleSubmit = useCallback(async (data, {reset}) => {
    try {
      reset();
    } catch (err) {}
  }, []);

  const scrollToFocusedInput = useCallback(inputName => {
    setInputSelected(inputName);
  }, []);

  const focusNextInput = useCallback(inputName => {
    formRef.current.getFieldRef(inputName).focus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Form
        formRef={formRef}
        handleSubmit={handleSubmit}
        inputSelected={inputSelected}
        initialData={{
          title: '',
          description: '',
        }}>
        <Input
          autoCorrect={false}
          name="title"
          placeholder="Post's title"
          autoCapitalize="none"
          returnKeyType="next"
          onFocus={() => scrollToFocusedInput('title')}
          onSubmitEditing={() => focusNextInput('email')}
        />

        <Input
          multiline
          autoCorrect={false}
          numberOfLines={5}
          name="description"
          placeholder="Post's description"
          autoCapitalize="none"
          returnKeyType="done"
          onFocus={() => scrollToFocusedInput('description')}
          onSubmitEditing={() => handleSubmit()}
        />
      </Form>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
    paddingTop: 250,
  },
});
