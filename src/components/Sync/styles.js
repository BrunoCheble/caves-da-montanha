import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
`;

export const Title = styled.Text`
color: #000;
font-size: 14px;
font-weight: bold;
margin-left: 20px;
`;

export const SubTitle = styled.View`
width: 50px;
`;

export const FlatList = styled.FlatList``;

export const BoxSearch = styled.View`
flex-direction: row;
justify-content: center;
border: 1px solid #ccc;
alignItems: center;
`;

export const Search = styled.TextInput`
flex: 1;
padding: 10px 10px 10px 0;
background-color: #fff;
color: #424242;
`;

export const Item = styled.TouchableOpacity`
flex-direction: row;
border-bottom-color: #ccc;
border-bottom-width: 1px;
padding: 20px;
align-items: center;
`;

export const Buttons = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

export const BtnSync = styled.TouchableOpacity`
  background-color: #2CA9C4;
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
  border-radius: 75px;
`;

export const TextSync = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`;
