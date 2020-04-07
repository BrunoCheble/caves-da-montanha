import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  justify-content: center;
  flex: 1;
  padding-horizontal: 20px;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

export const BoxLogo = styled.View`
  align-items: center;
`;

export const BoxInput = styled.View`
  flex: 1;
  min-width: 300px;
`;
export const Input = styled.TextInput`
  background: #fff;
  margin-bottom: 10px;
  text-align: center;
`;

export const SignIn = styled.TouchableOpacity`
  background: #3a3a3a;
  opacity: 0.8;
  border: 2px solid #e9c47f;
  padding: 10px;
  border-radius: 10px;
`;

export const SignInText = styled.Text`
text-align:center;
color: #FFF;
font-weight; bold;
font-size: 16px;
`;
