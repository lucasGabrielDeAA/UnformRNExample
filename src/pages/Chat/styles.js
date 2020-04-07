import {Platform, FlatList} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin: 0 15px;
`;

export const ToolBox = styled.View`
  align-items: flex-end;
  bottom: ${props => (Platform.OS === 'ios' ? props.keyboardHeight : 0)}px;
  background-color: #dfdfdf;
  display: flex;
  flex-direction: row;
  max-height: 150px;
  min-height: 50px;
  justify-content: space-between;
  padding: 5px 10px 5px 5px;
  position: absolute;
  width: 100%;
`;

export const StyledInput = styled.TextInput`
  background: #fff;
  border-radius: 20px;
  color: #444;
  font-size: 15px;
  padding: 10px;
  text-align-vertical: top;
  width: 80%;
`;

export const Messages = styled(FlatList).attrs(() => ({
  contentContainerStyles: {
    background: '#aaa',
    width: '100%',
    paddingTop: 10,
  },
}))``;

export const MessageContainer = styled.View`
  align-items: flex-start;
  align-self: flex-start;
  background: #39bcfa;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 8px;
  border-radius: 8px;
  justify-content: flex-start;
  margin: 5px 0;
  max-width: 50%;
  padding: 8px 15px;

  ${props =>
    props.side > 500 &&
    css`
      align-self: flex-end;
      background: #0050f4;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 0;
    `}
`;

export const Message = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: 400;
`;

export const SendButton = styled.TouchableOpacity`
  align-items: center;
  background: #0050f4;
  border-radius: 20px;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 70px;
`;

export const SendButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
`;
