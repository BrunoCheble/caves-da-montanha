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

export const ViewRow = styled.View`
flex-direction: row;
margin: 0 0 10px;
`;

export const Disponibilidade = styled.View`
flex-direction: row;
`;

export const RowColumn = styled.View`
margin: 0 0 20px;
`;

export const Title = styled.Text`
color: ${Color.tertiary};
font-size: 14px;
font-weight: bold;
`;
export const Nome = styled.Text`
color: ${Color.tertiary};
font-size: 14px;
font-weight: bold;
flex: 1;
`;

export const CondPag = styled.Text`
color: ${Color.primary};
font-size: 12px;
text-align: right;
`;

export const Nif = styled.Text`
color:  ${Color.primary};
font-size: 12px;
font-weight: bold;
flex: 1;
`;

export const Telefone = styled.Text`
color:  ${Color.primary};
font-size: 12px;
font-weight: bold;
text-align: right;
flex: 1;
`;

export const Email = styled.Text`
color:  ${Color.primary};
font-size: 12px;
font-weight: bold;
flex: 1;
`;

export const EnderecoWeb = styled.Text`
color:  ${Color.primary};
text-decoration: underline;
font-size: 12px;
font-weight: bold;
text-align: right;
flex: 1;
`;

export const SubTitle = styled.Text`
color: ${Color.primary};
font-size: 12px;
`;

export const Text = styled.Text`
color:  ${Color.primary};
font-size: 12px;
line-height: 20px;
`;

export const ColText = styled.Text`
color:  ${Color.primary};
font-size: 12px;
flex: 1;
font-weight: bold;
text-align: center;
`;

export const BtnBack = styled.TouchableOpacity`
background: ${Color.soft};
justify-content: center;
border-radius: 4px;
padding: 10px;
margin: 10px;
`;

export const TextBack = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const Btn = styled.TouchableOpacity`
border: 2px solid ${Color.primary};
padding: 5px 10px;
border-radius: 10px;
height: 30px;
justify-content: center;
`;

export const BtnText = styled.Text`
font-weight: bold;
color: ${Color.tertiary};
font-size: 12px;
`;
