import React, {useCallback, useState, useRef} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Image,
  View,
  Platform,
  UIManager,
  Text,
  TouchableOpacity,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import Form from '../components/Form';
import Input from '../components/Input';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CreatePost() {
  const formRef = useRef(null);
  // const keyboard = useKeyboard();

  const [inputSelected, setInputSelected] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [post, setPost] = useState('');

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

  const handleKeyboardLayout = useCallback(
    ({height, layoutAnimationConfig}) => {
      LayoutAnimation.configureNext(layoutAnimationConfig);
      setKeyboardHeight(height);
    },
    [],
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Form
          handleKeyboardLayout={handleKeyboardLayout}
          formRef={formRef}
          handleSubmit={handleSubmit}
          inputSelected={inputSelected}
          initialData={{
            title: '',
            description: '',
          }}>
          <Image
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
            }}
            resizeMode="contain"
            style={styles.logo}
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
            returnKeyType="done"
            handleFocus={() => scrollToFocusedInput('description')}
            onSubmitEditing={() => handleSubmit()}
            value={post}
            onChangeText={value => setPost(value)}
            maxLength={240}
          />
        </Form>
      </SafeAreaView>

      <View
        style={{
          ...styles.topKeyboard,
          bottom: keyboardHeight,
          display: keyboardHeight > 0 ? 'flex' : 'none',
          justifyContent:
            inputSelected === 'title' ? 'flex-end' : 'space-between',
        }}>
        {inputSelected === 'title' ? (
          <TouchableOpacity onPress={() => focusNextInput('description')}>
            <Text style={styles.textAction}>Next</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.textCount}>{post.length} / 240</Text>

            <TouchableOpacity onPress={() => setPost('')}>
              <Text style={styles.textAction}>Clean</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  logo: {
    alignSelf: 'center',
    height: 200,
    width: 300,
    marginTop: 50,
    marginBottom: 50,
  },
  topKeyboard: {
    alignItems: 'center',
    backgroundColor: '#dfdfdf',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
  },
  textCount: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },

  textAction: {
    color: '#0050f4',
    fontSize: 18,
    fontWeight: '600',
  },
});
