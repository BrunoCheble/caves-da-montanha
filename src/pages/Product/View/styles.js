import styled from 'styled-components/native';
import Color from '~/config/colors';

export const Container = styled.ImageBackground`
flex: 1;
background: #fefefe;
padding: 10px;
`;

export const Item = styled.View`
flex-direction: row;
`;

export const ViewColumn = styled.View`
flex-direction: column;
flex: 1;
`;

export const ViewRow = styled.View`
flex-direction: row;
`;

export const Title = styled.Text`
color: ${Color.tertiary};
font-size: 16px;
font-weight: bold;
margin-bottom: 10px;
flex: 1;
`;

export const SubTitle = styled.Text`
color: ${Color.secondary};
font-size: 12px;
margin-bottom: 5px;
`;

export const Bold = styled.Text`
color: ${Color.secondary};
font-size: 12px;
font-weight: bold;
`;

export const ButtonPCV = styled.TouchableOpacity`
border: 2px solid ${Color.primary};
background-color: ${Color.primary};
border-radius: 3px;
width: 25px;
height: 25px;
`;


export const Buttons = styled.View`
flex-direction: column;
flex: 1;
margin-left: 10px;
max-width: 150px;
justify-content: flex-start;
`;

export const ButtonDefault = styled.TouchableOpacity`
border: 2px solid ${Color.primary};
padding: 5px;
border-radius: 15px;
margin-top: 5px;
`;

export const ButtonTextDefault = styled.Text`
font-weight: bold;
text-align: center;
font-size: 12px;
color: ${Color.primary};
`;

export const BtnBack = styled.TouchableOpacity`
background-color: ${Color.soft};
justify-content: center;
border-radius: 4px;
padding: 10px;
`;

export const TextBack = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;
