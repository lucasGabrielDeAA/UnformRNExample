import React, {useCallback, useState} from 'react';
import {LayoutAnimation, Platform, UIManager} from 'react-native';

import KeyboardController from '../../common/KeyboardController';

import ToolBox from '../../components/ToolBox';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

import {
  Container,
  ToolBoxContent,
  StyledInput,
  Messages,
  MessageContainer,
  Message,
  SendButton,
  SendButtonText,
} from './styles';

export default function Chat() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = useCallback(() => {
    try {
      if (message.length > 0) {
        setMessages([
          ...messages,
          {id: Math.round(Math.random() * 1000), text: message},
        ]);
        setMessage('');
      }
    } catch (err) {}
  }, [message, messages]);

  const handleKeyboardCallback = useCallback(
    ({keyboardHeight: height, layoutAnimationConfig}) => {
      LayoutAnimation.configureNext(layoutAnimationConfig);
      setKeyboardHeight(height);
    },
    [],
  );

  return (
    <Container>
      <KeyboardController callback={handleKeyboardCallback} />
      <Messages
        keyExtractor={item => String(item.id)}
        data={messages}
        renderItem={({item}) => (
          <MessageContainer side={item.id}>
            <Message>{item.text}</Message>
          </MessageContainer>
        )}
      />

      <ToolBox bottom keyboardHeight={keyboardHeight}>
        <ToolBoxContent>
          <StyledInput
            multiline
            autoCapitalize="sentences"
            autoCorrect={false}
            name="message"
            placeholder="Type a message"
            returnKeyType="done"
            value={message}
            onChangeText={value => setMessage(value)}
          />
          <SendButton onPress={handleSubmit}>
            <SendButtonText>⌲</SendButtonText>
          </SendButton>
        </ToolBoxContent>
      </ToolBox>
    </Container>
  );
}
