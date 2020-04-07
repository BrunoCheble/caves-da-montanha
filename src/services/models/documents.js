export default class DocumentModel {
    static db;

    constructor(db) {
        this.db = db;
    }
    /*
    CREATE TABLE [VendaCab] (  
        [Id] uniqueidentifier NOT NULL, 
        [IdCliente] uniqueidentifier NOT NULL, 
        [IdDocErp] nvarchar(50) NULL COLLATE NOCASE, 
        [Data] datetime NOT NULL, 
        [IdVendedor] uniqueidentifier NOT NULL, 
        [TotalMercadoria] float NULL, 
        [TotalDesconto] float NULL, 
        [TotalIEC] float NULL, 
        [TotalIVA] float NULL, 
        [TotalDocumento] float NULL, 
        [IdMoradaEntrega] uniqueidentifier NULL, 
        [IdTipoTransacao] nvarchar(15) NULL COLLATE NOCASE, 
        [DataUltimaAtualizacao] datetime NULL, CONSTRAINT 
    )
    
    CREATE TABLE [VendaLin] (  [Id] uniqueidentifier NOT NULL, [IdVendaCab] uniqueidentifier NOT NULL, [IdArtigo] uniqueidentifier NOT NULL, [QuantidadeVenda] float NOT NULL, [QuantidadeOferta] float NOT NULL, [Preco] float NOT NULL, [Desconto] float NOT NULL, [ValorIEC] float NOT NULL, [IdIva] uniqueidentifier NOT NULL, [TaxaIva] float NOT NULL, [TotalLiquido] float NOT NULL, CONSTRAINT [PK_VendaLin] PRIMARY KEY ([Id]), CONSTRAINT [FK_VendaLin_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaLin_Iva] FOREIGN KEY ([IdIva]) REFERENCES [Iva] ([IdIva]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaLin_VendaCab] FOREIGN KEY ([IdVendaCab]) REFERENCES [VendaCab] ([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION)
    */
    findOne = id => new Promise((resolve, reject) => {
            this.db.transaction(tx => {

                const fields = [
                    'c.Nome as nome',
                    'c.NIF as nif',
                    "c.IdTipoEntidadeExterna as id_tipo_cliente",
                    'v.IdCliente as id_cliente_erp',
                    'v.Id as id',
                    'v.Data as data',
                    'v.IdVendedor as id_vendedor',
                    'v.TotalMercadoria as total_mercadoria',
                    'v.TotalDesconto as total_desconto',
                    'v.TotalIEC as total_iec',
                    'v.TotalIVA as total_iva',
                    'v.TotalDocumento as total_documento',
                    'v.IdMoradaEntrega as id_morada_entrega',
                    'v.IdTipoTransacao as id_tipo_transacao',
                    'e.Localidade as endereco',
                    't.Descricao as tipo_transacao',
                    '(IFNULL(c.LimiteSaldoValor,0)-(IFNULL(c.ValorPendMaior90DiasSemCheque,0)+IFNULL(c.ValorPendMaior90DiasComCheque,0)+IFNULL(c.ValorPendMenor90DiasSemCheque,0)+IFNULL(c.ValorPendMenor90DiasComCheque,0)+IFNULL(c.ValorEncPend,0)+IFNULL(v.TotalDocumento,0))) as dispo',
                    'IFNULL(c.ValorPendMaior90DiasSemCheque,0) as valor_pend_maior_sem_cheque',
                    'IFNULL(c.ValorPendMaior90DiasComCheque,0) as valor_pend_maior_com_cheque',
                    'IFNULL(c.ValorPendMenor90DiasSemCheque,0) as valor_pend_menor_sem_cheque',
                    'IFNULL(c.ValorPendMenor90DiasComCheque,0) as valor_pend_menor_com_cheque',
                    'c.LimiteSaldoValor as limite_saldo_valor',
                    'c.ValorContencioso as valor_contencioso',
                    'v.IdEstado as id_estado',
                    'v.MotivoBloqueio as motivo_bloqueio',
                    'v.Bloqueado as bloqueado',
                    '(SELECT SUM( ( vl.QuantidadeVenda * ( vl.Preco * (1-(IFNULL(vl.Desconto,0)/100)) ) ) - ( vl.QuantidadeVenda + vl.QuantidadeOferta ) * a.PrecoCustoVendedor ) FROM VendaLin vl JOIN Artigo a ON a.IdArtigo = vl.IdArtigo WHERE vl.IdVendaCab = v.Id) as totallucro'
                ];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM VendaCab v'
                    + ' JOIN Cliente c ON c.IdCliente = v.IdCliente'
                    + ' LEFT JOIN EntidadeMorada e ON e.IdEntidadeMorada = v.IdMoradaEntrega'
                    + ' JOIN TipoTransacao t ON t.IdTipoTransacao = v.IdTipoTransacao'
                    + ' WHERE v.Id = ?',
                    [id],
                    (tx, results) => {
                        const data = results.rows.length == 1 ? results.rows.item(0) : {};
                        resolve(data);
                    }
                );
            });
        });

    findAll = search => new Promise((resolve, reject) => {
            this.db.transaction(tx => {

                const fields = [
                    'c.Nome as nome',
                    'c.NIF as nif',
                    'v.DocERP as doc_erp',
                    'v.FecharERP as fechado',
                    'v.IdCliente as id_cliente_erp',
                    'v.Id as id',
                    'v.Data as data',
                    'v.IdVendedor as id_vendedor',
                    'v.TotalMercadoria as total_mercadoria',
                    'v.TotalDesconto as total_desconto',
                    'v.TotalIEC as total_iec',
                    'v.TotalIVA as total_iva',
                    'v.TotalDocumento as total_documento',
                    'v.IdMoradaEntrega as id_morada_entrega',
                    'v.IdTipoTransacao as id_tipo_transacao',
                    'v.IdEstado as id_estado',
                    'v.MotivoBloqueio as motivo_bloqueio',
                    'v.Bloqueado as bloqueado'
                ];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM VendaCab v'
                    + ' JOIN Cliente c ON c.IdCliente = v.IdCliente'
                    + ' WHERE IFNULL(?,"") = "" OR (UPPER(c.Nome) LIKE UPPER(?) OR c.NIF LIKE ?)'
                    + ' ORDER BY v.Data desc',
                    [search, "%" + search + "%", search + "%"],
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

    create = data =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {

                tx.executeSql(
                    "INSERT INTO VendaCab (Id, Data, IdVendedor, IdCliente, IdMoradaEntrega, IdTipoTransacao, IdEstado) VALUES (?, date('now'), ?, ?, ?, ?, 'RASCUNHO')",
                    [data.id, data.id_vendedor, data.id_cliente_erp, data.id_endereco, data.id_tipo_transacao],
                    (tx, results) => {
                        resolve(results.insertId);
                    }
                );
            });
        });

    update = (data, id) =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'UPDATE VendaCab set IdCliente = ?, IdMoradaEntrega = ?, IdTipoTransacao = ? WHERE Id = ?',
                    [data.id_cliente_erp, data.id_endereco, data.id_tipo_transacao, id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });

    closeDocument = (id) =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'UPDATE VendaCab set FecharERP = 1 WHERE Id = ?',
                    [id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });

    updateStatus = (status, id) =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'UPDATE VendaCab set IdEstado = ? WHERE Id = ?',
                    [status, id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });

    updateBlock = (block, motivo, id) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                'UPDATE VendaCab set IdEstado = "FINALIZADO", Bloqueado = ?, MotivoBloqueio = ? WHERE Id = ?',
                [block, motivo, id],
                (tx, results) => {
                    resolve(results);
                }
            );
        });
    });

    delete = id =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM VendaCab WHERE Id = ?',
                    [id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });
}
/*

CREATE TABLE [VendaIndiretaCab] (  [IdCab] uniqueidentifier NOT NULL, [Data] datetime NOT NULL, [IdEntidadeExterna] uniqueidentifier NULL, [IdClienteERP] uniqueidentifier NULL, [IdPromotora] uniqueidentifier NULL, [IdVendedorClienteERP] uniqueidentifier NULL, [IdVendedor] uniqueidentifier NULL, [TransferOrder] bit NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_VendaIndiretaCab] PRIMARY KEY ([IdCab]), CONSTRAINT [FK_VendaIndiretaCab_Vendedor] FOREIGN KEY ([IdVendedor]) REFERENCES [Vendedor] ([IdVendedor]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*/