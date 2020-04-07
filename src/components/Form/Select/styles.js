import {StyleSheet, Platform} from 'react-native';
import styled from 'styled-components/native';
import {Picker} from '@react-native-community/picker';

export const Container = styled.TouchableOpacity`
  align-items: center;
  background: #fff;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => (props.error ? '#f00' : '#ddd')};
  flex-direction: row;
  height: ${props => (props.multiline ? '250px' : '40px')};
  justify-content: space-between;
  padding: 0 15px;
  width: 100%;
`;

export const Label = styled.Text`
  border-width: 0;
  color: #b4b4b4;
  font-size: 15px;
`;

export const Value = styled.Text`
  border-width: 0;
  color: #000;
  font-size: 15px;
`;

export const StyledPicker = styled(Picker)`
  width: ${Platform.OS === 'ios' ? '100%' : '40%'};
`;

export const ModalContainer = styled.View`
  align-self: center;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  justify-content: center;
  padding-top: 20px;
  width: 90%;
`;

export const ModalTitle = styled.Text`
  color: #000;
  font-size: 20px;
  font-weight: 600;
`;

export const Buttons = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  height: 50px;
  justify-content: center;
  width: 50%;
`;

export const CancelText = styled.Text`
  font-size: 16px;
`;

export const ConfirmText = styled.Text`
  color: #ff4400;
  font-size: 16px;
`;
