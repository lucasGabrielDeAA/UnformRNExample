import {StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`;

export const CustomInput = styled.TextInput`
  border-color: ${props => (props.error ? '#f00' : '#444')}
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-width: 0;
  color: #444;
  font-size: 15px;
  padding: 16px 12px;

  ${props =>
    props.multiline &&
    css`
      height: 200px;
      text-align-vertical: top;
    `}

  ${props =>
    props.active &&
    css`
      border-color: #0050f4;
      border-bottom-width: ${StyleSheet.hairlineWidth + 1}px;
      font-size: 18px;
      padding: 13px 10px;
    `}
`;

export const Error = styled.Text`
  color: #f00;
  font-size: 15px;
  margin-top: 5px;
`;
