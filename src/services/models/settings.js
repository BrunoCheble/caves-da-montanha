export default class SettingModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    load = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {

                const fields = [
                    'InfoInstitucional as presentation',
                    'FormulaDesbloqueio as unlockFormula'
                ];
    
                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM Empresa',
                    [],
                    (tx, results) => {
                        const data = results.rows.length == 1 ? results.rows.item(0) : {};
                        resolve(data);
                    }
                );
            });
        });
}