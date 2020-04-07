import {Platform, FlatList, Dimensions} from 'react-native';
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
  flex: 1;
`;

export const ToolBox = styled.View`
  align-items: flex-start;
  bottom: ${props => (Platform.OS === 'ios' ? props.keyboardHeight : 0)}px;
  background: #dfdfdf;
  display: flex;
  max-height: 150px;
  min-height: ${props =>
    Platform.OS === 'ios'
      ? props.keyboardHeight === 0
        ? getIphoneHeight(50)
        : 0
      : 50}px;
  position: absolute;
  width: 100%;
`;

export const ToolBoxContent = styled.View`
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
  max-height: 150px;
  min-height: 50px;
  padding: 5px;
  width: 100%;
`;

export const StyledInput = styled.TextInput`
  background: #fff;
  border-radius: 20px;
  color: #444;
  font-size: 14px;
  min-height: 40px;
  padding: 10px;
  text-align-vertical: top;
  width: 80%;
`;

export const Messages = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    background: '#aaa',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
}))``;

export const MessageContainer = styled.View`
  align-items: flex-start;
  align-self: flex-start;
  background: #39bcfa;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 8px;
  border-radius: 8px;
  justify-content: flex-start;
  margin: 5px 0;
  max-width: 50%;
  padding: 8px 15px;

  ${props =>
    props.side > 500 &&
    css`
      align-self: flex-end;
      background: #0050f4;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 0;
    `}
`;

export const Message = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: 400;
`;

export const SendButton = styled.TouchableOpacity`
  align-items: center;
  background: #0050f4;
  border-radius: 20px;
  display: flex;
  height: 40px;
  justify-content: center;
  padding: 10px 0;
  width: 70px;
`;

export const SendButtonText = styled.Text`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
`;
