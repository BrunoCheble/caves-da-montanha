import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background: ${Color.dark};
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`;

export const TextBlock = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 200px;
`;

export const BoxInput = styled.View`
  flex: 1;
  align-items: center;
`;

export const Input = styled.TextInput`
  background: #fff;
  margin: 10px 0;
  color: ${Color.dark};
  border: 1px solid ${Color.tertiary};
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  font-weight: bold;
  font-size: 14px;
`;

export const BtnUnlock = styled.TouchableOpacity`
border: 1px solid ${Color.primary};
border-radius: 10px;
padding: 15px;
margin: 10px;
width: 150px;
align-items: center;
justify-content: center;
`
export const BtnText = styled.Text`
color: #fff;
font-size: 18px;
font-weight: bold;
text-align: center;
`;