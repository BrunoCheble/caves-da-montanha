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
`;

export const FlatList = styled.FlatList``;

export const BoxSearch = styled.View`
flex-direction: row;
justify-content: center;
border-bottom-color: #ccc;
border-bottom-width: 1px;
alignItems: center;
`;

export const Search = styled.TextInput`
flex: 1;
padding: 0;
background-color: #fff;
color: #424242;
`;

export const Item = styled.View`
flex-direction: row;
border-bottom-color: ${Color.soft};
border-bottom-width: 1px;
`;

export const AddButton = styled.TouchableOpacity`
background-color: ${Color.dark};
width: 45px;
height: 45px;
`;

export const ItemDetail = styled.TouchableOpacity`
flex-direction: column;
flex: 1;
margin: 10px;
`;

export const BtnLinkDocument = styled.TouchableOpacity`
background-color: ${Color.primary};
width: 45px;
justify-content: center;
alignItems: center;
`;