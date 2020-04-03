import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  align-items: center;
  flex: 1;
  margin: 0 15px;
`;

export const TopImage = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  align-self: center;
  height: 200px;
  width: 300px;
`;
