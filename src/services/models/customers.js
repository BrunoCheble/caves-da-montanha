export default class CustomerModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    findFirst = () => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'c.IdCliente as id',
                "IFNULL(c.IdTipoTransacao,'NORMAL') as id_tipo_transacao"
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM Cliente c LIMIT 1',
                [],
                (tx, results) => {
                    const data = results.rows.length == 1 ? results.rows.item(0) : { id: '', id_tipo_transacao: '' };
                    resolve(data);
                }
            );
        });
    });

    findOne = id => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'c.IdCliente as id',
                'c.Nome as nome',
                'c.Nome as name',
                'c.NIF as nif',
                'c.ClienteERP as cliente_erp',
                'tc.Descricao as tipo_cliente',
                'tc.IdTipoEntidadeExterna as id_tipo_cliente',
                'c.LimiteSaldoDias as limite_saldo_dias',
                'c.LimiteSaldoValor as limite_saldo_valor',
                'c.CondPag as id_cond_pag',
                'cp.Descricao as cond_pag',
                'c.IdVendedor as id_vendedor',
                'c.Observacoes as observacoes',
                'c.Telefone as telefone',
                'c.Email as email',
                'c.EnderecoWeb as endereco_web',
                'IFNULL(c.ValorPendMaior90DiasSemCheque,0) as valor_pend_maior_sem_cheque',
                'IFNULL(c.ValorPendMaior90DiasComCheque,0) as valor_pend_maior_com_cheque',
                'IFNULL(c.ValorPendMenor90DiasSemCheque,0) as valor_pend_menor_sem_cheque',
                'IFNULL(c.ValorPendMenor90DiasComCheque,0) as valor_pend_menor_com_cheque',
                "IFNULL(c.IdTipoTransacao,'NORMAL') as id_tipo_transacao",
                'IFNULL(c.ValorContencioso,0) as valor_contencioso',
                '(IFNULL(c.LimiteSaldoValor,0)-(IFNULL(c.ValorPendMaior90DiasSemCheque,0)+IFNULL(c.ValorPendMaior90DiasComCheque,0)+IFNULL(c.ValorPendMenor90DiasSemCheque,0)+IFNULL(c.ValorPendMenor90DiasComCheque,0)+IFNULL(c.ValorEncPend,0))) as dispo',
                'c.IdUtilizador as id_utilizador',
                'c.DataUltimaAtualizacao as data_ultima_atualizacao'
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM Cliente c'
                + ' LEFT JOIN TipoEntidadeExterna tc ON tc.IdTipoEntidadeExterna = c.IdTipoEntidadeExterna'
                + ' LEFT JOIN CondPag cp ON cp.IdCondPag = c.CondPag'
                + ' WHERE c.IdCliente = ?',
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
            this.db.transaction(tx => {
                const fields = [
                    'c.IdCliente as id',
                    'c.Nome as nome',
                    'c.Nome as name',
                    'c.NIF as nif',
                    'tc.Descricao as tipo_cliente',
                    'tc.IdTipoEntidadeExterna as id_tipo_cliente',
                    'c.LimiteSaldoDias as limite_saldo_dias',
                    'c.LimiteSaldoValor as limite_saldo_valor',
                    'c.CondPag as cond_pag',
                    'c.IdVendedor as id_vendedor',
                    'c.Observacoes as observacoes',
                    'c.Telefone as telefone',
                    'c.Email as email',
                    'c.EnderecoWeb as endereco_web',
                    'c.ValorPendMaior90DiasSemCheque as valor_pend_maior_sem_cheque',
                    'c.ValorPendMaior90DiasComCheque as valor_pend_maior_com_cheque',
                    'c.ValorPendMenor90DiasSemCheque as valor_pend_menor_sem_cheque',
                    'c.ValorPendMenor90DiasComCheque as valor_pend_maior_com_cheque',
                    "IFNULL(c.IdTipoTransacao,'NORMAL') as id_tipo_transacao",
                    'c.ValorContencioso as valor_contencioso',
                    '(IFNULL(c.LimiteSaldoValor,0)-(IFNULL(c.ValorPendMaior90DiasSemCheque,0)+IFNULL(c.ValorPendMaior90DiasComCheque,0)+IFNULL(c.ValorPendMenor90DiasSemCheque,0)+IFNULL(c.ValorPendMenor90DiasComCheque,0)+IFNULL(c.ValorEncPend,0))) as dispo',
                    'c.IdUtilizador as id_utilizador',
                    'c.DataUltimaAtualizacao as data_ultima_atualizacao'
                ];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM Cliente c'
                    + ' LEFT JOIN TipoEntidadeExterna tc ON tc.IdTipoEntidadeExterna = c.IdTipoEntidadeExterna'
                    + ' WHERE IFNULL(?,"") = "" OR (UPPER(c.Nome) LIKE UPPER(?) OR NIF LIKE ?)'
                    + ' ORDER BY c.Nome',
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
                    'INSERT INTO Cliente (Nome,NIF) VALUES (?,?)',
                    [data.title, data.description],
                    (tx, results) => {
                        resolve(results.insertId);
                    }
                );
            });
        });

    update = data =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'UPDATE Cliente set Nome = ?, NIF = ? WHERE id = ?',
                    [data.title, data.description, data.id],
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
                    'DELETE FROM Cliente WHERE IdCliente = ?',
                    [id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });
}
/*
CREATE TABLE [Cliente] (  [IdCliente] uniqueidentifier NOT NULL, [ClienteERP] nvarchar(50) NULL COLLATE NOCASE, [Nome] nvarchar(100) NULL COLLATE NOCASE, [NIF] nvarchar(50) NULL COLLATE NOCASE, [TipoCliente] nvarchar(15) NULL COLLATE NOCASE, [LimiteSaldoDias] smallint NULL, [LimiteSaldoValor] float NULL, [CondPag] nvarchar(15) NULL COLLATE NOCASE, [IdVendedor] uniqueidentifier NULL, [Observacoes] ntext NULL, [Telefone] nvarchar(20) NULL COLLATE NOCASE, [Email] nvarchar(200) NULL COLLATE NOCASE, [EnderecoWeb] nvarchar(200) NULL COLLATE NOCASE, [ValorPendMaior90DiasSemCheque] float NULL, [ValorPendMaior90DiasComCheque] float NULL, [ValorPendMenor90DiasSemCheque] float NULL, [ValorPendMenor90DiasComCheque] float NULL, [ValorContencioso] float NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_Cliente] PRIMARY KEY ([IdCliente]), CONSTRAINT [FK_Cliente_CondicaoPagamento] FOREIGN KEY ([CondPag]) REFERENCES [CondPag] ([IdCondPag]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_Cliente_TipoCliente] FOREIGN KEY ([TipoCliente]) REFERENCES [TipoCliente] ([IdTipoCliente]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_Cliente_Utilizador] FOREIGN KEY ([IdUtilizador]) REFERENCES [Utilizador] ([IdUtilizador]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_Cliente_Vendedor] FOREIGN KEY ([IdVendedor]) REFERENCES [Vendedor] ([IdVendedor]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*/
/*
CREATE TABLE [TipoCliente] (  [IdTipoCliente] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoCliente] PRIMARY KEY ([IdTipoCliente]))
*/