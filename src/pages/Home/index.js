import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Title,
  Buttons,
  Row,
  Button,
  ButtonText,
  ButtonIcon,
} from './styles';

export default function Home() {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>Welcome</Title>

      <Buttons>
        <Row>
          <Button onPress={() => navigation.navigate('Submit')}>
            <ButtonText>Keyboard Example</ButtonText>
            <ButtonIcon>⌨️</ButtonIcon>
          </Button>

          <Button onPress={() => navigation.navigate('CreatePost')}>
            <ButtonText>Keyboard Toolbox</ButtonText>
            <ButtonIcon>⚒</ButtonIcon>
          </Button>
        </Row>

        <Row>
          <Button onPress={() => navigation.navigate('Profile')}>
            <ButtonText>Strava Form</ButtonText>
            <ButtonIcon>📋</ButtonIcon>
          </Button>

          <Button onPress={() => navigation.navigate('Chat')}>
            <ButtonText>WhatsApp ToolBox</ButtonText>
            <ButtonIcon>💬</ButtonIcon>
          </Button>
        </Row>
      </Buttons>
    </Container>
  );
}
