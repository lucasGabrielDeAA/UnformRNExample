import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Container, Title} from './styles';

export default function Home() {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>Welcome</Title>

      <TouchableOpacity onPress={() => navigation.navigate('Submit')}>
        <Text>Keyboard example</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
        <Text>Keyboard toolbox</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Form example</Text>
      </TouchableOpacity>
    </Container>
  );
}
