import styled, {css} from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

export const Container = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`;

export const StyledInput = styled(TextInputMask)`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-width: 0;
  color: #444;
  font-size: 15px;
  padding: 16px 12px;

  ${props =>
    props.active &&
    css`
      border-bottom-width: ${1 + StyleSheet.hairlineWidth}px;
      border-color: #0050ff;
      border-width: 0;
      color: #444;
      font-size: 18px;
      padding: 13px 10px;
    `}

  ${props =>
    props.error &&
    css`
      border-bottom-width: ${StyleSheet.hairlineWidth}px;
      border-color: #f00;
      border-width: 0;
      color: #444;
      font-size: 15px;
      padding: 16px 12px;
    `}
`;

export const Error = styled.Text`
  color: #f00;
  font-size: 13px;
`;
