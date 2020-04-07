import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { BtnBack, TextBack } from './styles';
import RNPickerSelect from 'react-native-picker-select';

import { ViewRow } from '~/assets/styles';

export default SalesFilterOffile = ({ handleCustomerSales }) => {
    
    const sales_months = [
        {label: 'Janeiro', value: 1},
        {label: 'Fevereiro', value: 2},
        {label: 'Março', value: 3},
        {label: 'Abril', value: 4},
        {label: 'Maio', value: 5},
        {label: 'Junho', value: 6},
        {label: 'Julho', value: 7},
        {label: 'Agosto', value: 8},
        {label: 'Setembro', value: 9},
        {label: 'Outubro', value: 10}, 
        {label: 'Novembro', value: 11}, 
        {label: 'Dezembro', value: 12}
    ];

    const [startMonth, setStartMonth] = useState('');
    const [endMonth, setEndMonth] = useState('');

    return (
        <ViewRow>
            <View style={{ flex: 1 }}>
                <RNPickerSelect
                    onValueChange={(value) => setStartMonth(value)}
                    items={sales_months}
                    value={startMonth}
                    style={{ flex: 1 }}
                    placeholder={{
                        label: 'Início',
                        value: null,
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <RNPickerSelect
                    onValueChange={(value) => setEndMonth(value)}
                    items={sales_months}
                    value={endMonth}
                    placeholder={{
                        label: 'Fim',
                        value: null,
                    }}
                />
            </View>
            <BtnBack style={{ flex: 1, height: 30, alignSelf: 'center' }} onPress={() => handleCustomerSales(startMonth, endMonth, false)}>
                <TextBack>Filtrar</TextBack>
            </BtnBack>
        </ViewRow>
    );
}