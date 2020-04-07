import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.View`
flex: 1;
`;

export const Title = styled.Text`
color: ${Color.tertiary};
font-size: 14px;
font-weight: bold;
flex: 1;
text-align-vertical: center;
`;

export const SubTitle = styled.Text`
color: ${Color.secondary};
font-size: 12px;
`;

export const Status = styled.Text`
color: #fff;
background: ${Color.dark};
padding: 5px;
font-size: 10px;
height: 22px;
border-radius: 20px;
`;

export const Blocked = styled.Text`
color: #fff;
background: #cc0000;
padding: 5px;
height: 22px;
font-size: 10px;
border-radius: 20px;
margin-right: 10px;
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
padding: 10px 10px 10px 0;
background-color: #fff;
color: #424242;
`;

export const Item = styled.TouchableOpacity`
flex-direction: row;
padding: 10px;
border-bottom-color: ${Color.soft};
border-bottom-width: 1px;
`;

export const AddButton = styled.TouchableOpacity`
background-color: ${Color.dark};
padding: 10px;
`;

export const BoxInput = styled.View`
  flex: 1;
  min-width: 300px;
  margin: 10px;
`;

export const BoxDropdown = styled.View`
  flex: 1;
  min-width: 300px;
  margin: 10px;
  border: 1px solid #ccc;
`;

export const Label = styled.Text`
font-weight: bold;
`;

export const SubmitBtn = styled.TouchableOpacity`
margin-top: 10px;
background-color: #759D34;
padding: 15px;
`;

export const SubmitText = styled.Text`
color: #fff;
text-align: center;
font-weight: bold;
font-size: 14px;
`;

export const ItemDetail = styled.TouchableOpacity`
min-height: 34px;
flex-direction: column;
flex: 1;
`;
