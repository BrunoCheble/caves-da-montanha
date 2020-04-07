import styled from 'styled-components/native';
import Color from '~/config/colors';

export const BoxSearch = styled.View`
flex-direction: row;
justify-content: center;
border-bottom-color: #ccc;
border-bottom-width: 1px;
alignItems: center;
`;

export const Input = styled.TextInput`
flex: 1;
padding: 0;
background-color: #fff;
color: #424242;
font-size: 12px;
height: 45px;
`;

export const AddButton = styled.TouchableOpacity`
background-color: ${Color.dark};
justify-content: center;
alignItems: center;
width: 45px;
height: 45px;
`;
