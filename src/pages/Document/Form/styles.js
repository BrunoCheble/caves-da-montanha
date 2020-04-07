import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.View`
flex: 1;
`;

export const BoxInput = styled.View`
  flex: 1;
  min-width: 300px;
  margin: 10px;
`;

export const Buttons = styled.View`
margin-top: 10px;
flex-direction: row;
`;

export const SubmitBtn = styled.TouchableOpacity`
background-color: ${Color.primary};
padding: 10px;
flex: 1;
`;

export const SubmitText = styled.Text`
color: #fff;
text-align: center;
font-weight: bold;
font-size: 14px;
`;

export const BtnBack = styled.TouchableOpacity`
background-color: ${Color.soft};
padding: 10px;
flex: 1;
margin-right: 10px;
`;

export const TextBack = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;