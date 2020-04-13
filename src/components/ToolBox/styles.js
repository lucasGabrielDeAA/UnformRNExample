import {Platform} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  bottom: ${props => (Platform.OS === 'ios' ? props.keyboardHeight : 0)}px;
  background-color: #dfdfdf;
  display: none;
  flex-direction: row;
  height: 50px;
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
