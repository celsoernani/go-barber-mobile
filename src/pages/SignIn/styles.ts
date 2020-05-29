import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const TitleLogon = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f3ede8;
  font-size: 24px;
  margin: 64px 0px 20px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const TextForgotPassword = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  padding: 16px 0px ${getBottomSpace() === 0 ? 5 : getBottomSpace()}px;
  border-top-width: 1px;
  border-color: #232139;
`;
export const CreateAccountButtonText = styled.Text`
  color: #f4ede8;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
