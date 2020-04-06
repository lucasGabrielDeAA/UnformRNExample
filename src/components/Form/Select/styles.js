import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: #fff;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => (props.error ? '#f00' : '#ddd')};
  flex-direction: column;
  height: ${props => (props.multiline ? '250px' : '40px')};
  justify-content: center;
  padding: 0 15px;
  width: 100%;
`;

export const Label = styled.Text`
  border-width: 0;
  color: #b4b4b4;
  font-size: 15px;
  width: 100%;
`;

export const ModalContainer = styled.View`
  align-self: center;
  background: #fff;
  height: 400px;
  width: 70%;
`;
