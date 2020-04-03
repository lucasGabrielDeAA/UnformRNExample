import styled, {css} from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

export const Container = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
  height: 60px;
  width: 100%;
`;

export const Label = styled.Text`
  color: #444;
  font-size: 13px;
  display: ${props => (props.show ? 'flex' : 'none')};
`;

export const StyledInput = styled(TextInputMask).attrs(() => ({
  placeholderTextColor: '#a1a1a1;',
}))`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => (props.error ? '#f00' : '#444')}
  border-width: 0;
  color: #444;
  font-size: 15px;
  padding: 12px;

  ${props =>
    props.focused &&
    css`
      border-bottom-width: ${1 + StyleSheet.hairlineWidth}px;
      border-color: #0050ff;
      border-width: 0;
      color: #444;
    `}
`;

export const Error = styled.Text`
  color: #f00;
  font-size: 13px;
`;
