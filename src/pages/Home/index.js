import React from 'react';
import {Button} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Container, Title} from './styles';

export default function Home() {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>Bem-vindo</Title>

      <Button
        title="Keyboard example"
        onPress={() => navigation.navigate('Submit')}
      />
      <Button
        title="Keyboard topbox"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Button
        title="Form example"
        onPress={() => navigation.navigate('Profile')}
      />
    </Container>
  );
}
