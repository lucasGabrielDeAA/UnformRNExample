import {StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
  height: ${props => (props.multiline ? '250px' : '60px')};
  width: 100%;
`;

export const Label = styled.Text`
  color: #444;
  font-size: 13px;
  display: ${props => (props.show ? 'flex' : 'none')};
`;

export const CustomInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: '#a1a1a1;',
}))`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => (props.error ? '#f00' : '#444')};
  border-width: 0;
  color: #444;
  font-size: 15px;
  padding: 12px;

  ${props =>
    props.multiline &&
    css`
      height: 200px;
      text-align-vertical: top;
    `}

  ${props =>
    props.focused &&
    css`
      border-color: #0050f4;
      border-bottom-width: ${StyleSheet.hairlineWidth + 1}px;
    `}
`;

export const Error = styled.Text`
  color: #f00;
  font-size: 13px;
`;
