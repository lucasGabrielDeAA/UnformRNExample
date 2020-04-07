import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Label = styled.Text`
  color: #444;
  font-size: 10px;
  margin: 10px 15px;
  text-transform: uppercase;
`;

export const Information = styled.Text`
  color: #444;
  font-size: 12px;
  margin: 10px 15px;
`;

export const UserInfo = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px 20px 0;
  width: 100%;
`;

export const Avatar = styled.Image`
  border-radius: 30px;
  border-color: #ff4400;
  border-width: ${StyleSheet.hairlineWidth}px;
  height: 60px;
  width: 60px;
`;

export const NameContainer = styled.View`
  padding-left: 20px;
  flex: 1;
`;
