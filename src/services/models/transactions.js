export default class TransactionModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    findOne = id => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'IdTipoTransacao as value',
                'Descricao as label',
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM TipoTransacao'
                + ' WHERE IdTipoTransacao = ?',
                [id],
                (tx, results) => {
                    const data = results.rows.length == 1 ? results.rows.item(0) : {};
                    resolve(data);
                }
            );
        });
    });

    findAll = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                const fields = [
                    'IdTipoTransacao as value',
                    'Descricao as label'
                ];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM TipoTransacao',
                    [],
                    (tx, results) => {
                        const data = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            data.push(results.rows.item(i));
                        }
                        resolve(data);
                    }
                );
            });
        });
}