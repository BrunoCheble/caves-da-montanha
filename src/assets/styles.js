
import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.ScrollView`
flex: 1;
padding: 0 10px;
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

export const MsgErro = styled.Text`
background: ${Color.dark};
color: #fff;
font-weight: bold;
padding: 15px;
text-align: center;
margin-bottom: 20px;
`;
