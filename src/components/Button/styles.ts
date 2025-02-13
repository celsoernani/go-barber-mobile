import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  background-color: #ff9000;
  border-radius: 10px;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
`;
