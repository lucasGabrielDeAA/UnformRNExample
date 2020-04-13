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

export const ToolBoxContent = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: ${props =>
    props.onlyOneChild ? 'flex-end' : 'space-between'};
  width: 100%;
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
