import styled from 'styled-components/native';
import Color from '~/config/colors';

export const ModalTitle = styled.Text`
margin-bottom: 10px;
padding: 10px 0;
border: 1px solid #ccc;
padding: 10px 0;
color: #555;
font-size: 16px;
font-weight: bold;
text-align: center;
`;

export const TextPresentation = styled.Text`
font-size: 16px;
color: #333;
text-align: justify;
margin: 20px 0;
`;

export const BtnBack = styled.TouchableOpacity`
background-color: ${Color.soft};
justify-content: center;
border-radius: 4px;
padding: 10px;
`;

export const BtnBackDark = styled.TouchableOpacity`
background-color: ${Color.dark};
justify-content: center;
padding: 10px;
`;

export const TextBack = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const TextHeader = styled.Text`
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  margin: 5px;
`;