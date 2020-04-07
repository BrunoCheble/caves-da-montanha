export default class AdresseModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    updateGeo = (latitude,longitude,id) =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'UPDATE EntidadeMorada set Latitude = ?, Longitude = ? WHERE IdEntidadeMorada = ?',
                    [latitude, longitude, id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });

    findOne = id => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'e.IdEntidadeMorada as id',
                'IFNULL(e.Morada,e.Localidade) as name',
                'e.TipoEntidade as tipo_entidade',
                'e.IdEntidade as id_entidade',
                'e.MoradaPrincipal as morada_principal',
                'e.Morada as morada',
                'e.Localidade as localidade',
                'e.CodPostal as cod_postal',
                'e.CodPostalLocal as cod_postal_local',
                'd.Descricao as distrito',
                'p.Descricao as pais',
                'e.Latitude as latitude',
                'e.Longitude as longitude',
                'e.IdContacto as id_contacto',
                'e.IdUtilizador as id_utilizador',
                'e.DataUltimaAtualizacao as data_ultima_atualizacao',
                'c.Nome as nome',
                'c.Email as email',
                'c.Telemovel as telemovel',
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM EntidadeMorada e'
                + ' LEFT JOIN Pais p ON p.IdPais = e.pais'
                + ' LEFT JOIN Distrito d ON d.IdDistrito = e.distrito'
                + ' LEFT JOIN Contacto c ON c.IdContacto = e.IdContacto'
                + ' WHERE e.IdEntidadeMorada = ?',
                [id],
                (tx, results) => {
                    const data = results.rows.length == 1 ? results.rows.item(0) : {};
                    resolve(data);
                }
            );
        });
    });

    findAll = (type, id) =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                const fields = [
                    'e.IdEntidadeMorada as id',
                    'IFNULL(e.Morada,e.Localidade) as name',
                    'e.TipoEntidade as tipo_entidade',
                    'e.IdEntidade as id_entidade',
                    'e.MoradaPrincipal as morada_principal',
                    'e.Morada as morada',
                    'e.Localidade as localidade',
                    'e.CodPostal as cod_postal',
                    'e.CodPostalLocal as cod_postal_local',
                    'd.Descricao as distrito',
                    'p.Descricao as pais',
                    'e.Latitude as latitude',
                    'e.Longitude as longitude',
                    'e.IdContacto as id_contacto',
                    'e.IdUtilizador as id_utilizador',
                    'e.DataUltimaAtualizacao as data_ultima_atualizacao',
                    'c.Nome as nome',
                    'c.Email as email',
                    'c.Telemovel as telemovel',
                ];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM EntidadeMorada e'
                    + ' LEFT JOIN Pais p ON p.IdPais = e.pais'
                    + ' LEFT JOIN Distrito d ON d.IdDistrito = e.distrito'
                    + ' LEFT JOIN Contacto c ON c.IdContacto = e.IdContacto'
                    + ' WHERE e.TipoEntidade = ? AND e.IdEntidade = ?'
                    + ' ORDER BY e.MoradaPrincipal DESC',
                    [type, id],
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

    findOneMainAdresse = (type, id) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'e.IdEntidadeMorada as id',
                'IFNULL(e.Morada,e.Localidade) as name',
                'e.TipoEntidade as tipo_entidade',
                'e.IdEntidade as id_entidade',
                'e.MoradaPrincipal as morada_principal',
                'e.Morada as morada',
                'e.Localidade as localidade',
                'e.CodPostal as cod_postal',
                'e.CodPostalLocal as cod_postal_local',
                'd.Descricao as distrito',
                'p.Descricao as pais',
                'IFNULL(e.Latitude,0) as latitude',
                'IFNULL(e.Longitude,0) as longitude',
                'e.IdContacto as id_contacto',
                'e.IdUtilizador as id_utilizador',
                'e.DataUltimaAtualizacao as data_ultima_atualizacao',
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM EntidadeMorada e'
                + ' LEFT JOIN Pais p ON p.IdPais = e.pais'
                + ' LEFT JOIN Distrito d ON d.IdDistrito = e.distrito'
                + ' WHERE e.TipoEntidade = ? AND e.IdEntidade = ? AND e.MoradaPrincipal = 1 LIMIT 1',
                [type, id],
                (tx, results) => {
                    const data = results.rows.length == 1 ? results.rows.item(0) : { id: '' };
                    resolve(data);
                }
            );
        });
    });
}
/*
CREATE TABLE [EntidadeMorada] (  [IdEntidadeMorada] uniqueidentifier NOT NULL, [TipoEntidade] nvarchar(15) NOT NULL COLLATE NOCASE, [IdEntidade] uniqueidentifier NOT NULL, [MoradaPrincipal] bit NOT NULL, [Morada] nvarchar(100) NULL COLLATE NOCASE, [Localidade] nvarchar(100) NULL COLLATE NOCASE, [CodPostal] nvarchar(20) NULL COLLATE NOCASE, [CodPostalLocal] nvarchar(100) NULL COLLATE NOCASE, [Distrito] nvarchar(15) NULL COLLATE NOCASE, [Pais] nvarchar(15) NULL COLLATE NOCASE, [Latitude] float NULL, [Longitude] float NULL, [IdContacto] uniqueidentifier NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_EntidadeMorada] PRIMARY KEY ([IdEntidadeMorada]), CONSTRAINT [FK_EntidadeMorada_TipoEntidade] FOREIGN KEY ([TipoEntidade]) REFERENCES [TipoEntidade] ([IdTipoEntidade]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [EntidadeMoradaHorario] (  [IdMoradaHorario] uniqueidentifier NOT NULL, [IdEntidadeMorada] uniqueidentifier NOT NULL, [Dia] smallint NOT NULL, [HoraInicio1] datetime NULL, [HoraFim1] datetime NULL, [HoraInicio2] datetime NULL, [HoraFim2] datetime NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_MoradaHorario] PRIMARY KEY ([IdMoradaHorario]), CONSTRAINT [FK_EntidadeMoradaHorario_EntidadeMorada] FOREIGN KEY ([IdEntidadeMorada]) REFERENCES [EntidadeMorada] ([IdEntidadeMorada]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_EntidadeMoradaHorario_Utilizador1] FOREIGN KEY ([IdUtilizador]) REFERENCES [Utilizador] ([IdUtilizador]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [Pais] (  [IdPais] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, [NOrdem] int NULL, CONSTRAINT [PK_Pais] PRIMARY KEY ([IdPais]))
*//*
CREATE TABLE [Distrito] (  [IdDistrito] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_Distrito] PRIMARY KEY ([IdDistrito]))
*//*
CREATE TABLE [CodigoPostal] (  [Pais] nvarchar(15) NOT NULL, [IdCodigoPostal] nvarchar(15) NOT NULL COLLATE NOCASE, [Descricao] nvarchar(100) NULL COLLATE NOCASE, CONSTRAINT [PK_CodigoPostal] PRIMARY KEY ([Pais],[IdCodigoPostal]))
*/