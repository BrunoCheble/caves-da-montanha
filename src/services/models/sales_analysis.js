export default class SalesAnalysisModel {
    static db;

    constructor(db) {
        this.db = db;

    }

    findAllPendingByCustomer = customer => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields_pen = [
                'IdHistoricoERP as id',
                'IdHistoricoERP as id_historico',
                'TipoDoc as tipo_doc',
                'Serie as serie',
                'NumDoc as num_doc',
                "Data as data",
                "DataVencimento as data_vencimento",
                "DataLiquidacao as data_liquidacao",
                'ValorTotal as valor_total',
                "IFNULL((SELECT SUM(ValorLiquidado) FROM LiqLin ll JOIN LiqCab lc ON lc.Id = ll.IdLiqCab WHERE IdHistorico = h.IdHistoricoERP AND lc.IdEstado <> 'INTEGRADO'),0)  as valor_liquidado",
                'ValorPendente as valor_pendente',
                'Estado as estado',
                '0 as liquidacao',
                'null as id_cab',
                "'CHEQUE' as cheque"
            ];

            const fields_chc = [
                'll.Id as id',
                'll.IdHistorico as id_historico',
                'h.TipoDoc as tipo_doc',
                'h.Serie as serie',
                'h.NumDoc as num_doc',
                "strftime('%d/%m/%Y', lc.DataValor) as data",
                "h.DataVencimento as data_vencimento",
                "h.DataLiquidacao as data_liquidacao",
                'h.ValorTotal as valor_total',
                'll.ValorLiquidado as valor_liquidado',
                '0 as valor_pendente',
                "'CHC' as estado",
                '0 as liquidacao',
                'll.IdLiqCab as id_cab',
                'lc.IdModoPagamento as cheque'
            ];

            const sql_chc = 'SELECT ' + fields_chc.join(', ') + ' FROM LiqLin ll'
                + ' JOIN LiqCab lc ON lc.Id = ll.IdLiqCab'
                + ' JOIN Historico h ON h.IdHistoricoERP = ll.IdHistorico'
                + ' WHERE lc.IdCliente = ?';

            const sql_pen = 'SELECT ' + fields_pen.join(', ') + ' FROM Historico h WHERE IdCliente = ? AND (h.Estado = ? OR h.Estado = ?)';

            tx.executeSql(
                'SELECT * FROM (' + sql_chc + ' UNION ' + sql_pen + ') x ORDER BY tipo_doc, serie, num_doc, data asc',
                [customer, customer, 'PEN', 'CHC'],
                (tx, results) => {
                    const data = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        let document = results.rows.item(i);
                        if ((document.valor_pendente - document.valor_liquidado != 0 && document.estado == 'PEN')) {
                            data.push({ ...document, valor_pendente: document.valor_pendente - document.valor_liquidado });
                        }
                        else if (document.estado == 'CHC') {
                            data.push(document);
                        }
                    }
                    resolve(data);
                }
            );
        });
    });

    findAllHistoricByCustomer = customer => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'IdHistoricoERP as id',
                'TipoDoc as tipo_doc',
                'Serie as serie',
                'NumDoc as num_doc',
                "Data as data",
                "DataVencimento as data_vencimento",
                "DataLiquidacao as data_liquidacao",
                'ValorTotal as valor_total',
                'ValorPendente as valor_pendente',
                'Estado as estado',
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM Historico h WHERE IdCliente = ? ORDER BY Data asc',
                [customer],
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

    findAllSalesByCustomer = (customer, start, end) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'a.IdArtigo as id',
                'app.Ano ano',
                'a.Descricao as artigo',
                'SUM(IFNULL(QtdAnoMesN,0)) as qtd',
                'SUM(IFNULL(QtdAnoMesN_1,0)) as qtd_h',
                'SUM(IFNULL(ValorAnoMesN,0)) as valor',
                'SUM(IFNULL(ValorAnoMesN_1,0)) as valor_h',
                'SUM(CASE WHEN IFNULL(QtdAnoMesN,0) = 0 THEN 0 ELSE ((ValorAnoMesN/QtdAnoMesN)-a.PrecoCustoVendedor)*QtdAnoMesN END) as margem',
                'SUM(CASE WHEN IFNULL(QtdAnoMesN_1,0) = 0 THEN 0 ELSE ((ValorAnoMesN_1/QtdAnoMesN_1)-a.PrecoCustoVendedor)*QtdAnoMesN_1 END) as margem_h',
            ];
            
            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM AppEstatisticaVendas app'
                + ' JOIN Artigo a ON a.IdArtigo = app.IdArtigo'
                + " WHERE IdCliente = ? AND app.Mes BETWEEN "+start +" AND "+end
                + ' GROUP BY app.Ano, a.IdArtigo, a.Descricao '
                + ' ORDER BY a.ArtigoERP',
                [customer],
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
    CREATE TABLE [AppEstatisticaVendas] (
        [Id] uniqueidentifier NOT NULL,
        [IdVendedor] uniqueidentifier NULL,
        [IdCliente] uniqueidentifier NULL,
        [IdArtigo] uniqueidentifier NULL,
        [Ano] smallint NULL,
        [Mes] smallint NULL,
        [QtdAnoMesN] float NULL,
        [QtdAnoMesN_1] float NULL,
        [ValorAnoMesN] float NULL,
        [ValorAnoMesN_1] float NULL,
        CONSTRAINT
        [PK_EstatisticaVendas]
        PRIMARY KEY ([Id]))
*/