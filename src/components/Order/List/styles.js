import styled from 'styled-components/native';
import Color from '~/config/colors';

export const List = styled.FlatList`
`;

export const Item = styled.View`
flex-direction: row;
border-bottom-color: ${Color.soft};
border-bottom-width: 1px;
`;

export const DetailArticle = styled.View`
padding:  5px 10px;
flex: 1px;
background: ${Color.soft};
border-bottom-color: #fff;
border-bottom-width: 1px;
`;

export const CodeArticle = styled.Text`
font-size: 12px;
font-weight: bold;
color: ${Color.tertiary};
`;
export const NameArticle = styled.Text`
font-size: 11px;
color: ${Color.dark};
`;

export const BoxNumbers = styled.View`
flex-direction: row;
justify-content: space-between;
align-content: space-between;
margin-top: 5px;
`;

export const ValueBase = styled.Text`
font-size: 11px;
font-weight: bold;
color: ${Color.tertiary};
`;

export const TotalArticle = styled.Text`
font-size: 11px;
font-weight: bold;
color: ${Color.tertiary};
`;

export const OfferItem = styled.TextInput`
background: #fff;
color: ${Color.tertiary};
border-right-color: ${Color.soft};
border-right-width: 1px;
width: 50px;
font-size: 11px;
text-align: center;
`;
export const QttItem = styled.TextInput`
background: #fff;
color: ${Color.tertiary};
border-right-color: ${Color.soft};
border-right-width: 1px;
width: 50px;
font-size: 11px;
text-align: center;
`;
export const ValueItem = {
    backgroundColor: '#fff',
    borderRightColor: Color.soft,
    color: Color.tertiary,
    borderRightWidth: 1,
    width: 60,
    fontSize: 11,
    textAlign: 'center',
    textAlignVertical: "center"
};

export const TaxItem = styled.TextInput`
background: #fff;
border-right-color: ${Color.soft};
border-right-width: 1px;
width: 50px;
font-size: 14px;
text-align: center;
`;

export const OffItem = styled.TextInput`
background: #fff;
border-right-color: ${Color.soft};
border-right-width: 1px;
color: ${Color.tertiary};
width: 50px;
font-size: 11px;
text-align: center;
padding: 10px 0;
`;

export const DetailHeader = styled.View`
font-weight: bold;
border-left-width: 1px;
border-left-color: ${Color.soft};
border-right-color: ${Color.soft};
border-right-width: 1px;
flex: 1px;
color: ${Color.tertiary};
flex-direction: row;
text-align-vertical: center;
`;

export const OfferHeader = styled.Text`
background: #fff;
border-right-color: ${Color.soft};
border-right-width: 1px;
width: 50px;
text-align: center;
font-size: 11px;
font-weight: bold;
color: ${Color.tertiary};
padding: 5px 0;
text-align-vertical: center;
`;

export const OffHeader = styled.Text`
background: #fff;
border-right-color: ${Color.soft};
border-right-width: 1px;
width: 50px;
text-align: center;
font-size: 11px;
font-weight: bold;
color: ${Color.tertiary};
padding: 5px 0;
text-align-vertical: center;
`;

export const PriceHeader = styled.Text`
background: #fff;
border-right-color: ${Color.soft};
border-right-width: 1px;
width: 60px;
text-align: center;
font-size: 11px;
font-weight: bold;
color: ${Color.tertiary};
padding: 5px 0;
text-align-vertical: center;
`;


export const PVMItemHeader = styled.Text`
background: #fff;
border-right-color: ${Color.soft};
border-right-width: 1px;
width: 60px;
text-align: center;
font-size: 11px;
font-weight: bold;
color: ${Color.tertiary};
padding: 5px 0;
text-align-vertical: center;
`;
export const PVMItem = {
    backgroundColor: '#fff',
    borderRightColor: Color.soft,
    color: Color.tertiary,
    borderRightWidth: 1,
    width: 60,
    fontSize: 11,
    textAlign: 'center',
    textAlignVertical: "center"
};

export const OFFItem = {
    backgroundColor: '#fff',
    borderRightColor: Color.soft,
    color: Color.tertiary,
    borderRightWidth: 1,
    width: 50,
    fontSize: 11,
    textAlign: 'center',
    textAlignVertical: "center"
};

export const BtnExibeTL = styled.TouchableOpacity`
background: ${Color.soft};
width: 50px;
height: 20px;
margin: 5px;
`

export const BoxControlHeader = styled.View`
flex: 1;
flex-direction: row;
align-items: center; 
justify-content: flex-end;
text-align-vertical: center;
`

export const TextQttItem = styled.Text`
background: #fff;
color: ${Color.tertiary};
border-right-color: ${Color.soft};
border-right-width: 1px;
width: 50px;
font-size: 11px;
text-align: center;
text-align-vertical: center;
`

export const TextOfferItem = styled.Text`
background: #fff;
color: ${Color.tertiary};
border-right-color: ${Color.soft};
border-right-width: 1px;
width: 50px;
font-size: 11px;
text-align: center;
text-align-vertical: center;
`;

export const RHeader = styled.TextInput`
background: #fff;
border-color: ${Color.soft};
border-width: 1px;
color: ${Color.tertiary};
width: 50px;
height: 20px;
margin: 5px;
padding: 5px 2px;
font-size: 10px;
text-align: center;
`;

export const InvestimentoHeader = styled.TextInput`
background: #fff;
border-color: ${Color.soft};
border-width: 1px;
color: ${Color.tertiary};
width: 75px;
height: 20px;
margin: 5px;
padding: 5px 2px;
font-size: 10px;
text-align: center;
`;

export const TextHeader = styled.Text`
color: ${Color.tertiary};
margin-left: 10px;
font-size: 11px;
text-align: center;
text-align-vertical: center;
`;

export const TextSymbolHeader = styled.Text`
color: ${Color.tertiary};
margin-right: 10px;
font-size: 11px;
text-align: center;
text-align-vertical: center;
`;
