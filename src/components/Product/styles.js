import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.View`
flex: 1;
`;

export const Title = styled.Text`
color: ${Color.tertiary};
font-size: 14px;
font-weight: bold;
`;

export const SubTitle = styled.Text`
color: ${Color.secondary};
font-size: 12px;
flex: 1;
`;

export const BoxSearch = styled.View`
flex-direction: row;
justify-content: center;
border-bottom-color: #ccc;
border-bottom-width: 1px;
align-items: center;
`;

export const Search = styled.TextInput`
flex: 1;
padding: 0;
background-color: #fff;
color: #424242;
`;

export const CamButton = styled.TouchableOpacity`
background-color: ${Color.dark};
height: 45px;
width: 45px;
justify-content: center;
alignItems: center;
`;

export const AddButton = styled.TouchableOpacity`
background-color: ${Color.secondary};
height: 40;
align-items: center;
justify-content: center;
`;

export const FlatList = styled.FlatList``;

export const ItemDetail = styled.TouchableOpacity`
flex-direction: column;
flex: 1;
margin: 10px;
`;

export const Item = styled.View`
flex-direction: row;
border-bottom-color: ${Color.soft};
border-bottom-width: 1px;
`;

export const Buttons = styled.View`
  flex: 1;
  max-width: 45px;
`;

export const DelButton = styled.TouchableOpacity`
background-color: ${Color.soft};
height: 45px;
align-items: center;
justify-content: center;
`;

export const QttItem = styled.TextInput`
background: #fff;
border-right-color: #ccc;
border-right-width: 1px;
flex: 1;
font-size: 11px;
text-align: center;
`;

export const BtnUnlinkDocument = styled.TouchableOpacity`
background-color: ${Color.dark};
height: 45px;
width: 45px;
justify-content: center;
alignItems: center;
`;

export const BtnLinkDocument = styled.TouchableOpacity`
background-color: ${Color.primary};
height: 45px;
width: 45px;
justify-content: center;
alignItems: center;
`;


export const BtnBackModal = styled.TouchableOpacity`
background: #2793e6;
justify-content: center;
border-radius: 4px;
padding: 20px;
margin: 10px;
`;

export const TextBackModal = styled.Text`
  font-size: 12px;
  color: #fff;
  text-align: center;
`;

export const ValueBase = styled.Text`
color: ${Color.primary};
font-size: 12px;
font-weight: bold;
`;

export const Stock = styled.Text`
color: ${Color.primary};
font-size: 12px;
font-weight: bold;
`;

export const TaxaIVA = styled.Text`
color: ${Color.primary};
font-size: 12px;
font-weight: bold;
`;


export const BtnType = styled.TouchableOpacity`
background-color: ${Color.dark};
height: 45px;
width: 45px;
justify-content: center;
alignItems: center;
`;

export const TextType = styled.Text`
color: #fff;
text-align: center;
font-weight: bold;
`;
    