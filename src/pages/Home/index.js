import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Container, Title, Buttons, Row, Button, ButtonText} from './styles';

export default function Home() {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>Welcome</Title>

      <Buttons>
        <Row>
          <Button onPress={() => navigation.navigate('Submit')}>
            <ButtonText>Keyboard Example</ButtonText>
          </Button>

          <Button onPress={() => navigation.navigate('CreatePost')}>
            <ButtonText>Keyboard Toolbox</ButtonText>
          </Button>
        </Row>

        <Row>
          <Button onPress={() => navigation.navigate('Profile')}>
            <ButtonText>Strava Form</ButtonText>
          </Button>

          <Button onPress={() => navigation.navigate('Chat')}>
            <ButtonText>WhatsApp ToolBox</ButtonText>
          </Button>
        </Row>
      </Buttons>
    </Container>
  );
}
