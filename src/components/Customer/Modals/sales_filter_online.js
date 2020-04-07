import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BtnBack, TextBack } from './styles';
import DatePicker from 'react-native-datepicker';

import moment from "moment";

import Color from '~/config/colors';
import { ViewRow, MsgErro } from '~/assets/styles';

export default SalesFilterOnline = ({ handleCustomerSales }) => {

    const [startMonth, setStartMonth] = useState('');
    const [endMonth, setEndMonth] = useState('');
    
    const [msgInvalid, setMsgInvalid] = useState('');

    useEffect(() => {
        setStartMonth(moment().format('DD/MM/YYYY'));
        setEndMonth(moment().format('DD/MM/YYYY'));
    }, []);

    const handleValidateFilter = () => {

        const start = moment(startMonth, 'DD/MM/YYYY');
        const end = moment(endMonth, 'DD/MM/YYYY');

        let msg = '';

        if(end.diff(start,'years') > 0) {
            msg = 'O intervalo não pode ser superior a 365 dias.';
        }
        else if(end.diff(start,'days') < 0) {
            msg = 'A data fim não pode ser inferior a data início.';
        }

        setMsgInvalid(msg);
        return (msg === '');
    }

    const handleFilter = () => {
        if(handleValidateFilter()) {
            handleCustomerSales(moment(startMonth, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(endMonth, 'DD/MM/YYYY').format('YYYY-MM-DD'), true);
        }
    }
    
    return (
        <>
            {msgInvalid != '' ? (<MsgErro>{msgInvalid}</MsgErro>) : (<></>)}
            <ViewRow>

                <View style={{ flex: 1 }}>
                    <DatePicker
                        style={{ width: 200 }}
                        date={startMonth}
                        mode="date"
                        format="DD/MM/YYYY"
                        maxDate={new Date()}
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                                bottom: 2,
                            },
                            dateInput: {
                                bottom: 2,
                                height: 28,
                                alignItems: 'center',
                                borderColor: Color.primary,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }
                        }}
                        onDateChange={(value) => setStartMonth(value)}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <DatePicker
                        style={{ width: 200 }}
                        date={endMonth}
                        mode="date"
                        maxDate={new Date()}
                        format="DD/MM/YYYY"
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                                bottom: 2,
                            },
                            dateInput: {
                                bottom: 2,
                                height: 28,
                                alignItems: 'center',
                                borderColor: Color.primary,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }
                        }}
                        onDateChange={(value) => setEndMonth(value)}
                    />
                </View>
                <BtnBack style={{ flex: 1, height: 30, alignSelf: 'center' }} onPress={() => handleFilter()}>
                    <TextBack>Filtrar</TextBack>
                </BtnBack>
            </ViewRow>
        </>
    );
}