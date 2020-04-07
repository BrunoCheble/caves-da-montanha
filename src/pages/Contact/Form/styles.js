import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.View`
flex: 1;
`;

export const MsgErro = styled.Text`
background: ${Color.dark};
color: #fff;
font-weight: bold;
padding: 10px;
text-align: center;
margin: 20px;
`;

export const BoxInput = styled.View`
  flex: 1;
  min-width: 300px;
  margin: 10px;
`;

export const Label = styled.Text`
color: ${Color.primary};
font-size: 12px;
font-weight: bold;
margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  background: #fff;
  margin-bottom: 10px;
  color: ${Color.dark};
  border: 1px solid #ccc;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
  height: 35px;
  padding: 10px;
  text-align-vertical: top;
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

export const MaskPhone = {
  marginBottom: 20,
  backgroundColor: '#fff',
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 4,
  paddingLeft: 20,
  color: Color.tertiary,
  fontSize: 14,
  fontWeight: 'bold'
};