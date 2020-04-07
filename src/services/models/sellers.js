export default class SellerModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    findOne = id => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            
            const fields = [
                'v.IdVendedor as id',
                'v.VendedorERP as vendedor_erp',
                'v.Nome as nome',
                'v.Nome as name',
                'v.DataUltimaAtualizacao as data_ultima_atualizacao',
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM Vendedor v'
                + ' WHERE v.IdVendedor = ?',
                [id],
                (tx, results) => {
                    const data = results.rows.length == 1 ? results.rows.item(0) : {};
                    resolve(data);
                }
            );
        });
    });

    findAll = search =>
        new Promise((resolve, reject) => {

            const fields = [
                'v.IdVendedor as id',
                'v.VendedorERP as vendedor_erp',
                'v.Nome as nome',
                'v.Nome as name',
                'v.DataUltimaAtualizacao as data_ultima_atualizacao',
            ];

            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM Vendedor v',
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
/*
CREATE TABLE [Vendedor] (  [IdVendedor] uniqueidentifier NOT NULL, [VendedorERP] nvarchar(50) NOT NULL COLLATE NOCASE, [Nome] nvarchar(100) NOT NULL COLLATE NOCASE, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_Vendedor] PRIMARY KEY ([IdVendedor]))
*/