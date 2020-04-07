import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.ImageBackground`
flex: 1;
background: #fff;
padding: 10px;
`;

export const Header = styled.View`
    padding: 10px;
    border: 1px solid ${Color.soft};
    border-radius: 4px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-content: space-between;
`; 

export const Title = styled.Text`
  color: ${Color.tertiary};
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SubTitle = styled.Text`
  color: ${Color.secondary};
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const NomeContato = styled.Text`
  color: ${Color.tertiary};
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const BtnBack = styled.TouchableOpacity`
background: ${Color.soft};
justify-content: center;
border-radius: 4px;
padding: 10px;
flex: 1;
max-width: 100px;
`;

export const TextBack = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const Erro = styled.Text`
font-size: 14px;
color: #333;
text-align: center;
`;

export const BtnSave = styled.TouchableOpacity`
background: ${Color.primary};
justify-content: center;
border-radius: 4px;
padding: 10px;
margin-left: 10px;
flex: 1;
`;

export const TextSave = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const BtnLocation = styled.TouchableOpacity`
background: ${Color.primary};
justify-content: center;
border-radius: 4px;
padding: 10px;
margin-left: 10px;
flex: 1;
`;

export const BtnMap = styled.TouchableOpacity`
background: ${Color.primary};
justify-content: center;
border-radius: 4px;
padding: 10px;
margin-left: 10px;
flex: 1;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  height: 35px;
  margin-top: 10px;
`;