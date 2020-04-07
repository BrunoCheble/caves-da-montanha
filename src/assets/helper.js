export const formatMoney = { precision: 2, separator: ',', delimiter: '.', unit: '€ ', suffixUnit: ''};
export const formatMoneyNegative = { ...formatMoney, unit: '€ -' };
export const formatPercent = { precision: 0, separator: ' ', delimiter: ' ', unit: '', suffixUnit: '%'};
export const formatDate = { format: 'DD/MM/YYYY' };

export const formatTextPhone = (cod,number) => (cod == 351 || cod == null || cod == '' ? number : '+'+cod+' '+number);

export const getColorDisponibilidade = (valor_pend_maior_sem_cheque, dispo, valor_contencioso, valor_pend_maior_com_cheque) => {
    if((valor_pend_maior_sem_cheque > 0 && dispo > 0) || (valor_contencioso > 0) || (valor_pend_maior_com_cheque > 0 && dispo < 0)) {
        return '#af0404';
    }
    else if((valor_pend_maior_com_cheque > 0 && dispo > 0) || dispo <= 0) {
        return '#ff7f00';
    }
    else {
        return '#5a8e1f';
    }
    /*
    IF (P>90dssCH > 0 AND Dispon > 0) OR (Contenci > 0) OR (P>90dscCH > 0 AND Dispon < 0)
        Dispon: vermelho

    ELSE IF (P>90dscCH > 0 AND Dispon > 0) OR (Dispon <= 0)
        Dispon: amarelo

    ELSE 
        Dispon: verde
    */
}