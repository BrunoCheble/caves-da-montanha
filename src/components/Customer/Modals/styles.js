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

export const Header  = styled.TouchableOpacity`
padding: 10px;
border: 1px solid ${Color.soft};
border-radius: 4px;
margin-bottom: 10px;
justify-content: space-between;
align-content: space-between;
`;

export const Total = styled.Text`
padding: 5px;
font-weight: bold;
color: ${Color.secondary};
font-size: 11px;
`;

export const BtnFilter = styled.TouchableOpacity`
background-color: ${Color.primary};
justify-content: center;
border-radius: 4px;
padding: 10px;
`;

export const TextFilter = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;


export const BtnBack = styled.TouchableOpacity`
background-color: ${Color.soft};
justify-content: center;
border-radius: 4px;
padding: 10px;
max-width: 100px;
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

export const TextBody = styled.Text`
  font-size: 10px;
  color: ${Color.primary};
  margin: 5px;
`;

export const BtnSave = styled.TouchableOpacity`
background: ${Color.primary};
justify-content: center;
border-radius: 4px;
padding: 10px;
margin-left: 10px;
`;

export const TextSave = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  height: 35px;
`;

export const Payment = styled.View`
  height: 35px;
  flex-direction: row;
  justify-content: center;
  text-align-vertical: center;
`;

export const BtnPayment = styled.TouchableOpacity`
background: ${Color.primary};
justify-content: center;
border-radius: 4px;
padding: 10px;
margin-right: 10px;
`;

export const PaymentText = styled.Text`
color: #fff;
font-size: 12px;
`;