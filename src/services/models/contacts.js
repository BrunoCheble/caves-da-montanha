export default class ContactModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    findAllAssociated = (id, search) =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                const fields = [
                    'ce.IdContactoEntidade as id',
                    'ce.IdContacto as id_contacto',
                    'cl.IdCliente as id_cliente',
                    'ce.IdEntidade as id_entidade',
                    'IFNULL(ex.NomeComercial, IFNULL(cl.Nome, IFNULL(c.Nome, v.Nome))) as nome',
                    'IFNULL(ex.Telefone, IFNULL(cl.Telefone, IFNULL(c.Telemovel, ""))) as telefone',
                    'IFNULL(c.PrefixoTelemovel, "") as codtelefone',
                    'IFNULL(c.Telemovel2, "") as telefoneop',
                    'IFNULL(c.PrefixoTelemovel2, "") as codtelefoneop',
                    'ce.TipoEntidade as tipo_entidade',
                    'ce.TipoRelacaoContacto as tipo_relacao_contacto'
                ];

                tx.executeSql(
                    'SELECT * FROM ( '
                    + ' SELECT ' + fields.join(', ') + ' FROM ContactoEntidade ce '
                    + " LEFT JOIN Cliente cl ON ce.IdEntidade = cl.IdCliente AND ce.TipoEntidade = 'CLIENTE'"
                    + " LEFT JOIN EntidadeExterna ex ON ce.IdEntidade = ex.IdEntidadeExterna AND ce.TipoEntidade = 'EXTERNA'"
                    + " LEFT JOIN Contacto c ON ce.IdEntidade = c.IdContacto AND ce.TipoEntidade = 'CONTACTO'"
                    + " LEFT JOIN Vendedor v ON ce.IdEntidade = v.IdVendedor AND ce.TipoEntidade = 'VENDEDOR'"
                    + ' WHERE ce.IdContacto = ?'
                    + ' ) t'
                    + ' WHERE (IFNULL(?,"") = "" OR (UPPER(t.nome) LIKE UPPER(?) OR t.telefone LIKE ?)) AND (t.id <> "" AND t.nome <> "")',
                    [id, search, "%" + search + "%", search + "%"],
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

    findOne = id => new Promise((resolve, reject) => {

        this.db.transaction(tx => {
            const fields = [
                'c.IdContacto as id',
                'c.Nome as nome',
                'c.Email as email',
                'c.Telemovel as telemovel',
                'c.PrefixoTelemovel as codtelemovel',
                'c.Telemovel2 as telemovelop',
                'c.PrefixoTelemovel2 as codtelemovelop',
                'c.Observacoes as observacoes',
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM Contacto c'
                + ' WHERE c.IdContacto = ?',
                [id],
                (tx, results) => {

                    let data = { id: null, nome: null, email: null, codtelemovel: null, telemovel: null, codtelemovelop: null, telemovelop: null };

                    if(results.rows.length == 1) {
                        data = results.rows.item(0);
                    }


                    resolve(data);
                }
            );
        });
    });

    findAllAssociatedByEntity = (type, id) => new Promise((resolve, reject) => {

        this.db.transaction(tx => {
            const fields = [
                'c.IdContacto as id',
                'c.Nome as nome',
                'c.Email as email',
                'c.Telemovel as telemovel',
                'c.PrefixoTelemovel as codtelemovel',
                'c.Telemovel2 as telemovelop',
                'c.PrefixoTelemovel2 as codtelemovelop',
                'ce.TipoRelacaoContacto as tipo_relacao_contacto'
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM ContactoEntidade ce'
                + ' JOIN Contacto c ON ce.IdContacto = c.IdContacto'
                + ' WHERE ce.IdEntidade = ? AND ce.TipoEntidade = ?',
                [id, type],
                (tx, results) => {
                    console.log(results);
                    //let data = { id: null, nome: null, email: null, telemovel: null, telemovelop: null };
                    const data = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        data.push(results.rows.item(i));
                    }
                    resolve(data);
                }
            );
        });
    });

    findAll = search =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                const fields = [
                    'c.IdContacto as id',
                    'c.Nome as nome',
                    'c.Email as email',
                    'c.Telemovel as telemovel',
                    'c.PrefixoTelemovel as codtelemovel',
                    'c.Telemovel2 as telemovelop',
                    'c.PrefixoTelemovel2 as codtelemovelop',
                    'c.Observacoes as observacoes',
                    'c.IdUtilizador as id_utilizador',
                    'c.DataUltimaAtualizacao as data_ultima_atualizacao'
                ];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM Contacto c '
                    + ' LEFT JOIN ContactoEntidade ce ON ce.IdContacto = c.IdContacto AND (ce.TipoEntidade = "CLIENTE" OR ce.TipoEntidade = "EXTERNA")'
                    + ' LEFT JOIN Cliente cl ON cl.IdCliente = ce.IdEntidade AND ce.TipoEntidade = "CLIENTE"'
                    + ' LEFT JOIN EntidadeExterna ee ON ee.IdEntidadeExterna = ce.IdEntidade AND ce.TipoEntidade = "EXTERNA"'
                    + ' WHERE IFNULL(?,"") = "" '
                    + ' OR (UPPER(c.Nome) LIKE UPPER(?) OR c.Telemovel LIKE ? OR c.Telemovel2 LIKE ?) '
                    + ' OR (UPPER(cl.Nome) LIKE UPPER(?) OR cl.NIF LIKE ?) '
                    + ' OR (UPPER(ee.NomeComercial) LIKE UPPER(?)) '
                    + ' GROUP BY c.IdContacto, c.Nome, c.Email, c.Telemovel, c.Telemovel2, c.Observacoes, c.IdUtilizador, c.DataUltimaAtualizacao',
                    [
                        search, 
                        "%" + search + "%", 
                        search + "%", 
                        search + "%", 
                        "%" + search + "%", 
                        search + "%", 
                        "%" + search + "%"
                    ],
                    (tx, results) => {
                        const data = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            data.push(results.rows.item(i));
                        }
                        console.log(data);
                        resolve(data);
                    }
                );
            });
        });

    findAllAnother = ignore_contact =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                const fields = [
                    'c.IdContacto as id',
                    'c.Nome as nome',
                    'c.Email as email',
                    'c.Telemovel as telemovel',
                    'c.PrefixoTelemovel as codtelemovel',
                    'c.Telemovel2 as telemovelop',
                    'c.PrefixoTelemovel2 as codtelemovelop',
                    'c.Observacoes as observacoes',
                    'c.IdUtilizador as id_utilizador',
                    'c.DataUltimaAtualizacao as data_ultima_atualizacao'
                ];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM Contacto c WHERE ? <> c.IdContacto',
                    [ignore_contact],
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
                    "INSERT INTO Contacto (IdContacto, Nome, Email, PrefixoTelemovel, Telemovel, PrefixoTelemovel2, Telemovel2, Observacoes, IdUtilizador, DataUltimaAtualizacao) VALUES (?,?,?,?,?,?,?,?,?,date('now'))",
                    [data.id, data.nome, data.email, data.codtelemovel, data.telemovel, data.codtelemovelop, data.telemovelop, data.observacoes, data.id_utilizador],
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
                    "UPDATE Contacto set Nome = ?, Email = ?, PrefixoTelemovel = ?, Telemovel = ?, PrefixoTelemovel2 = ?, Telemovel2 = ?, Observacoes = ?, IdUtilizador = ?, DataUltimaAtualizacao = date('now') WHERE IdContacto = ?",
                    [data.nome, data.email, data.codtelemovel, data.telemovel, data.codtelemovelop, data.telemovelop, data.observacoes, data.id_utilizador, id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });
}
/*
CREATE TABLE [TipoRelacaoContacto] (  [IdTipoRelacaoContacto] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoRelacaoConstacto] PRIMARY KEY ([IdTipoRelacaoContacto]))
*//*
CREATE TABLE [Contacto] (  [IdContacto] uniqueidentifier NOT NULL, [Nome] nvarchar(100) NULL COLLATE NOCASE, [Email] nvarchar(200) NULL COLLATE NOCASE, [Telemovel] nvarchar(20) NULL COLLATE NOCASE, [Observacoes] ntext NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_Contacto] PRIMARY KEY ([IdContacto]), CONSTRAINT [FK_Contacto_Utilizador] FOREIGN KEY ([IdUtilizador]) REFERENCES [Utilizador] ([IdUtilizador]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [ContactoEntidade] (  [IdContacto] uniqueidentifier NOT NULL, [TipoEntidade] nvarchar(15) NOT NULL COLLATE NOCASE, [IdEntidade] uniqueidentifier NOT NULL, [TipoRelacaoContacto] nvarchar(15) NULL COLLATE NOCASE, CONSTRAINT [PK_ContactoEntidade] PRIMARY KEY ([IdContacto],[TipoEntidade],[IdEntidade]), CONSTRAINT [FK_ContactoEntidade_Contacto] FOREIGN KEY ([IdContacto]) REFERENCES [Contacto] ([IdContacto]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_ContactoEntidade_TipoEntidade] FOREIGN KEY ([TipoEntidade]) REFERENCES [TipoEntidade] ([IdTipoEntidade]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_ContactoEntidade_TipoRelacaoContacto] FOREIGN KEY ([TipoRelacaoContacto]) REFERENCES [TipoRelacaoContacto] ([IdTipoRelacaoContacto]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*/