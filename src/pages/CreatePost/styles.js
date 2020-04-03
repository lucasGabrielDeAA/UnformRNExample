import {Platform} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  margin: 0 15px;
`;

export const TopImage = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  align-self: center;
  height: 200px;
  margin: 50px 0;
  width: 300px;
`;

export const ToolBox = styled.View`
  align-items: center;
  bottom: ${props => (Platform.OS === 'ios' ? props.keyboardHeight : 0)}px;
  background-color: #dfdfdf;
  display: none;
  flex-direction: row;
  height: 50px;
  justify-content: ${props => (props.pullToEnd ? 'flex-end' : 'space-between')};
  opacity: 0;
  padding: 0 20px;
  position: absolute;
  width: 100%;

  ${props =>
    props.keyboardHeight > 0 &&
    css`
      display: flex;
      opacity: 1;
    `}
`;

export const Action = styled.TouchableOpacity``;

export const ActionText = styled.Text`
  color: #0050f4;
  font-size: 18px;
  font-weight: 600;
`;

export const Label = styled.Text`
  color: #000;
  font-size: 14px;
  font-weight: 400;
`;
