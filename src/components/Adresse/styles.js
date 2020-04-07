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

export const Endereco = styled.Text`
color: ${Color.secondary};
font-size: 12px;
font-weight: bold;
`;

export const Complemento = styled.Text`
color: ${Color.secondary};
font-size: 10px;
`;

export const FlatList = styled.FlatList``;

export const Item = styled.TouchableOpacity`
flex-direction: column;
padding: 10px;
border-radius: 5px;
border: 1px solid ${Color.soft};
margin: 10px 0 0;
`;

export const Contacto = styled.Text`
color: ${Color.secondary};
font-size: 12px;
font-weight: bold;
`;