import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`;

export const Buttons = styled.View`
  flex: 1;
  padding-top: 30px;
  width: 100%;
`;

export const Row = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
`;

export const Title = styled.Text`
  color: #000;
  font-size: 32px;
  font-weight: 600;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  background: #0050f4;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  elevation: 2;
  display: flex;
  height: 180px;
  padding: 15px 5px;
  width: 180px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
