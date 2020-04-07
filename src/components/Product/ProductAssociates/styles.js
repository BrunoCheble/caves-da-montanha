import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Title = styled.Text`
font-size: 14px;
font-weight: bold;
color: ${Color.tertiary}
margin-top: 20px;
`;

export const List = styled.FlatList`
margin-top: 20px;
max-height: 270px;
`;

export const Item = styled.TouchableOpacity`
align-items: center;
width: 75px;
border: 1px solid #ccc;
margin-right: 10px;
padding: 5px;
`;

export const Name = styled.Text`
font-size: 11px;
font-weight: bold;
text-align: center;
color: ${Color.primary}
`;

export const Price = styled.Text`
font-size: 11px;
color: ${Color.primary}
`;

export const Thumb = {
    width: 75, 
    height: 150
};