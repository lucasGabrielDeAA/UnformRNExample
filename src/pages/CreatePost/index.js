import React, {useCallback, useState, useRef} from 'react';
import {LayoutAnimation, Platform, UIManager, Keyboard} from 'react-native';

import Form from '../../components/Form';
import Input from '../../components/Form/Input';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

import {
  Container,
  TopImage,
  ToolBox,
  Action,
  Label,
  ActionText,
} from './styles';

export default function CreatePost() {
  const formRef = useRef(null);

  const [inputSelected, setInputSelected] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [post, setPost] = useState('');

  const handleSubmit = useCallback(async (data, {reset}) => {
    try {
      Keyboard.dismiss();
      reset();
      setPost('');
    } catch (err) {}
  }, []);

  const scrollToFocusedInput = useCallback(inputName => {
    setInputSelected(inputName);
  }, []);

  const focusNextInput = useCallback(inputName => {
    formRef.current.getFieldRef(inputName).focus();
  }, []);

  const handleKeyboardLayout = useCallback(
    ({height, layoutAnimationConfig}) => {
      LayoutAnimation.configureNext(layoutAnimationConfig);
      setKeyboardHeight(height);
    },
    [],
  );

  return (
    <>
      <Container>
        <Form
          scrollEnabled={false}
          handleKeyboardLayout={handleKeyboardLayout}
          formRef={formRef}
          handleSubmit={handleSubmit}
          inputSelected={inputSelected}
          initialData={{
            title: '',
            description: '',
          }}>
          <TopImage
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
            }}
          />

          <Input
            autoCorrect={false}
            name="title"
            placeholder="Post's title"
            keyboardType="number-pad"
            autoCapitalize="none"
            handleFocus={() => scrollToFocusedInput('title')}
            onSubmitEditing={() => focusNextInput('description')}
          />

          <Input
            multiline
            autoCorrect={false}
            numberOfLines={5}
            name="description"
            placeholder="Post's description"
            autoCapitalize="none"
            handleFocus={() => scrollToFocusedInput('description')}
            value={post}
            onChangeText={value => setPost(value)}
            maxLength={240}
          />
        </Form>
      </Container>

      <ToolBox
        pullToEnd={inputSelected === 'title'}
        keyboardHeight={keyboardHeight}>
        {inputSelected === 'title' ? (
          <Action onPress={() => focusNextInput('description')}>
            <ActionText>Next</ActionText>
          </Action>
        ) : (
          <>
            <Label>{post.length} / 240</Label>

            <Action onPress={() => formRef.current.submitForm()}>
              <ActionText>Submit</ActionText>
            </Action>
          </>
        )}
      </ToolBox>
    </>
  );
}
