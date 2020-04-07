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
color: ${Color.primary};
font-size: 12px;
`;

export const FlatList = styled.FlatList``;

export const Item = styled.TouchableOpacity`
flex-direction: column;
padding: 10px;
border-bottom-color: ${Color.soft};
border-bottom-width: 1px;
`;
