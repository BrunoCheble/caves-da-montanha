

import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.ScrollView`
  flex: 1;
  background: #fefefe;
  padding: 10px;
`;


export const Header = styled.View`
    padding: 15px 15px 10px;
    border: 1px solid ${Color.soft};
    border-radius: 4px;
    margin-bottom: 15px;
    margin-bottom: 15px;
`; 

export const Title = styled.Text`
  color: ${Color.tertiary};
  font-size: 14px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
color: ${Color.secondary};
font-size: 15px;`;

export const TipoTransacao  = styled.Text`
color: ${Color.secondary};
font-size: 12px;
`;

export const Section = styled.View`
margin-top: 15px;
margin-bottom: 15px;
`;

export const HeaderSection = styled.View`
border: 1px solid ${Color.soft};
padding: 5px;
flex-direction: row;
justify-content: space-between;
align-content: space-between;
`;

export const ViewTotal = styled.View`
flex: 1;
flex-direction: column;
`;

export const Total = styled.Text`
padding: 5px;
font-weight: bold;
color: ${Color.secondary};
font-size: 11px;
`;


export const Buttons = styled.View`
flex-direction: row;
margin: 20px 0;
`;

export const FinishOrder = styled.TouchableOpacity`
background-color: ${Color.dark};
justify-content: center;
border-radius: 4px;
padding: 10px;
height: 40px;
flex: 1;
margin-left: 10px;
`;

export const TextFinishOrder = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const BtnBack = styled.TouchableOpacity`
background-color: ${Color.soft};
justify-content: center;
border-radius: 4px;
padding: 10px;
height: 40px;
flex: 1;
`;

export const TextBack = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const RemoveOrder = styled.TouchableOpacity`
background-color: #c40b0a;
justify-content: center;
border-radius: 4px;
padding: 10px;
height: 40px;
flex: 1;
margin-left: 10px;
`;

export const TextRemoveOrder = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;
