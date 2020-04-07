export default class SalesoffModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    updateAllHeaderDate = ids => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                "UPDATE LiqCab set DataUltimaAtualizacao = date('now') WHERE Id IN(?)",
                ["'" + ids.join("','") + "'"],
                (tx, results) => {
                    resolve(results);
                }
            );
        });
    });

    deleteAllHeaderEmpty = () => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM LiqCab WHERE Id IN (SELECT lc.Id FROM LiqCab lc LEFT JOIN LiqLin ll ON ll.IdLiqCab = lc.Id WHERE ll.Id IS NULL GROUP BY lc.Id)',
                [],
                (tx, results) => {
                    console.log(results);
                    resolve(results);
                }
            );
        });
    });

    deleteRow = (id) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM LiqLin WHERE Id = ?',
                [id],
                (tx, results) => {
                    console.log(results);
                    resolve(results);
                }
            );
        });
    });

    findAllSalesoffByCustomer = customer => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'll.Id as id',
                'lc.Id as id_cab',
                'h.TipoDoc as tipo_doc',
                'h.Serie as serie',
                'h.NumDoc as num_doc',
                "strftime('%d/%m/%Y', lc.Data) as data",
                'll.ValorLiquidado as valor_liquidado',
                'lc.IdEstado as estado'
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM LiqLin ll'
                + ' JOIN LiqCab lc ON lc.Id = ll.IdLiqCab'
                + ' JOIN Historico h ON h.IdHistoricoERP = ll.IdHistorico'
                + ' WHERE lc.IdCliente = ? AND lc.IdEstado = ? ORDER BY lc.Data',
                [customer, 'FINALIZADO'],
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

    createHeader = data =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    "INSERT INTO LiqCab (Id, IdVendedor, IdCliente, IdDocERP, DataValor, IdModoPagamento, IdEstado, Data, DataUltimaAtualizacao) VALUES (?, ?, ?, ?, ?, ?, 'FINALIZADO', date('now'), date('now'))",
                    [data.id_liq_cab, data.id_vendedor, data.id_cliente_erp, data.id_documento_erp, data.paymentDate, data.paymentType],
                    (tx, results) => {
                        resolve(results.insertId);
                    }
                );
            });
        });

    createRow = data =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    "INSERT INTO Liqlin (Id, IdLiqCab, IdHistorico, ValorLiquidado) VALUES (?, ?, ?, ?)",
                    [data.id, data.id_liq_cab, data.id_historico, data.liquidacao],
                    (tx, results) => {
                        resolve(results.insertId);
                    }
                );
            });
        });
}