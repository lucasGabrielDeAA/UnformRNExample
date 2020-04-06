import {StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => (props.error ? '#f00' : '#ddd')};
  flex-direction: column;
  height: ${props => (props.multiline ? '250px' : '40px')};
  justify-content: center;
  padding: 0 15px;
  width: 100%;
`;

export const StyledInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: '#a1a1a1',
}))`
  border-width: 0;
  color: #444;
  font-size: 15px;
  width: 100%;

  ${props =>
    props.multiline &&
    css`
      height: 200px;
      text-align-vertical: top;
    `}
`;

export const Error = styled.Text`
  color: #f00;
  font-size: 13px;
`;
