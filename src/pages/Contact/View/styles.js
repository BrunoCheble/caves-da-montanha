import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.ImageBackground`
flex: 1;
background: #fefefe;
padding: 10px;
`;

export const Header = styled.View`
    padding: 10px;
    border: 1px solid ${Color.soft};
    border-radius: 4px;
    margin-bottom: 15px;
`; 

export const ViewColumn = styled.View`
flex-direction: column;
flex: 1;
`;

export const ViewRow = styled.View`
flex-direction: row;
justify-content: space-between;
align-content: space-between;
`;

export const Title = styled.Text`
color: ${Color.tertiary};
font-size: 14px;
font-weight: bold;
margin-bottom: 10px;
flex: 1;
`;

export const TitleAssociated = styled.Text`
color: ${Color.secondary};
font-size: 16px;
font-weight: bold;
`;

export const SubTitle = styled.Text`
color: ${Color.secondary};
font-size: 12px;
text-align:right;
margin-right: 20px;
flex: 1;
`;

export const BtnBack = styled.TouchableOpacity`
background-color: ${Color.soft};
justify-content: center;
border-radius: 4px;
padding: 10px;
`;

export const TextBack = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const Nome = styled.Text`
color: ${Color.tertiary};
font-size: 14px;
font-weight: bold;
`;

export const Telefone = styled.Text`
color: ${Color.secondary};
font-size: 12px;
flex: 1;
`;

export const TipoRelacao = styled.Text`
color: ${Color.secondary};
font-size: 10px;
font-weight: bold;
text-align: right;
flex: 1;
`;

export const Observations = styled.Text`
margin-top: 10px;
color: ${Color.secondary};
font-size: 10px;
`;

export const FlatList = styled.FlatList`
`;

export const ItemDetail = styled.TouchableOpacity`
flex-direction: column;
flex: 1;
margin: 10px;
`;

export const Item = styled.View`
flex-direction: row;
border-bottom-color: ${Color.soft};
border-bottom-width: 1px;
border-left-color: ${Color.soft};
border-left-width: 1px;
`;

export const DelButton   = styled.TouchableOpacity`
background-color: ${Color.primary};
justify-content: center;
alignItems: center;
width: 45px;
`;

export const BtnEdit = styled.TouchableOpacity`
border: 2px solid ${Color.primary};
padding: 10px;
border-radius: 10px;
height: 30px;
justify-content: center;
`;

export const TextBtnEdit = styled.Text`
font-weight: bold;
color: ${Color.tertiary};
font-size: 12px;
`;
