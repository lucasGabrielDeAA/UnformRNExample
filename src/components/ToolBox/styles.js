import {Platform, Dimensions} from 'react-native';
import styled, {css} from 'styled-components/native';

const getIphoneHeight = initialHeight => {
  const {height} = Dimensions.get('window');

  return isIPhoneXSize(height) || isIPhoneXrSize(height)
    ? initialHeight + 30
    : 0;
};

const isIPhoneXSize = height => {
  return height === 812;
};

const isIPhoneXrSize = height => {
  return height === 896;
};

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

  ${props =>
    props.bottom &&
    css`
      align-items: flex-start;
      display: flex;
      max-height: 150px;
      min-height: ${Platform.OS === 'ios'
        ? props.keyboardHeight === 0
          ? getIphoneHeight(50)
          : 0
        : 50}px;
      opacity: 1;
    `}
`;
