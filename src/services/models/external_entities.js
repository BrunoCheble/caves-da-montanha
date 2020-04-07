export default class ExternalEntityModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    findAll = search =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {

                const fields = [
                    'e.IdEntidadeExterna as id',
                    'e.EntidadeExternaERP as entidade_externa_erp',
                    'e.IdTipoEntidadeExterna as id_tipo_entidade_externa',
                    'te.Descricao as tipo_entidade_externa',
                    'e.IdCategoriaEntidadeExterna as id_categoria_entidade_externa',
                    'ce.Descricao as categoria_entidade_externa',
                    'e.IdClassificacaoEntidade as id_classificacao_entidade',
                    'cle.Descricao as classificacao_entidade',
                    'e.NomeFiscal as nome_fiscal',
                    'e.NomeComercial as nome',
                    'e.IdVendedor as id_vendedor',
                    'e.Telefone as telefone',
                    'e.Email as email',
                    'e.Observacoes as observacoes',
                    'e.IdUtilizador as id_utilizador',
                    'e.DataUltimaAtualizacao as data_ultima_atualizacao',
                ];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM EntidadeExterna e'
                    + ' LEFT JOIN TipoEntidadeExterna te ON te.IdTipoEntidadeExterna = e.IdTipoEntidadeExterna'
                    + ' LEFT JOIN ClassificacaoEntidade cle ON cle.IdClassificacaoEntidade = e.IdClassificacaoEntidade'
                    + ' LEFT JOIN CategoriaEntidadeExterna ce ON ce.IdCategoriaEntidadeExterna = e.IdCategoriaEntidadeExterna',
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
CREATE TABLE [EntidadeExterna] (  [IdEntidadeExterna] uniqueidentifier NOT NULL, [EntidadeExternaERP] nvarchar(50) NULL COLLATE NOCASE, [IdTipoEntidadeExterna] nvarchar(15) NULL COLLATE NOCASE, [IdCategoriaEntidadeExterna] nvarchar(15) NULL COLLATE NOCASE, [IdClassificacaoEntidade] nvarchar(15) NULL COLLATE NOCASE, [NomeFiscal] nvarchar(100) NULL COLLATE NOCASE, [NomeComercial] nvarchar(100) NULL COLLATE NOCASE, [IdVendedor] uniqueidentifier NULL, [Telefone] nvarchar(20) NULL COLLATE NOCASE, [Email] nvarchar(200) NULL COLLATE NOCASE, [Observacoes] ntext NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_EntidadeExterna] PRIMARY KEY ([IdEntidadeExterna]), CONSTRAINT [FK_EntidadeExterna_CategoriaEntidadeExterna] FOREIGN KEY ([IdCategoriaEntidadeExterna], [IdTipoEntidadeExterna]) REFERENCES [CategoriaEntidadeExterna] ([IdCategoriaEntidadeExterna], [IdTipoEntidadeExterna]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_EntidadeExterna_ClassificacaoEntidade] FOREIGN KEY ([IdClassificacaoEntidade]) REFERENCES [ClassificacaoEntidade] ([IdClassificacaoEntidade]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_EntidadeExterna_TipoEntidadeExterna] FOREIGN KEY ([IdTipoEntidadeExterna]) REFERENCES [TipoEntidadeExterna] ([IdTipoEntidadeExterna]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [TipoEntidadeExterna] (  [IdTipoEntidadeExterna] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoEntidadeExterna] PRIMARY KEY ([IdTipoEntidadeExterna]))
*//*
CREATE TABLE [ClassificacaoEntidade] (  [IdClassificacaoEntidade] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_ClassificacaoEntidade_1] PRIMARY KEY ([IdClassificacaoEntidade]))
*//*
CREATE TABLE [CategoriaEntidadeExterna] (  [IdCategoriaEntidadeExterna] nvarchar(15) NOT NULL, [IdTipoEntidadeExterna] nvarchar(15) NOT NULL COLLATE NOCASE, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_CategoriaEntidadeExterna] PRIMARY KEY ([IdCategoriaEntidadeExterna],[IdTipoEntidadeExterna]), CONSTRAINT [FK_CategoriaEntidadeExterna_TipoEntidadeExterna] FOREIGN KEY ([IdTipoEntidadeExterna]) REFERENCES [TipoEntidadeExterna] ([IdTipoEntidadeExterna]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [TipoEntidade] (  [IdTipoEntidade] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoEntidade] PRIMARY KEY ([IdTipoEntidade]))
*/