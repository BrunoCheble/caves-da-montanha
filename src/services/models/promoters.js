export default class PromoterModel {
    static db;

    constructor(db) {
        this.db = db;
    }
}

/*
CREATE TABLE [TipoPerfil] (  [IdTipoPerfil] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoUtilizador] PRIMARY KEY ([IdTipoPerfil]))
*//*
CREATE TABLE [CondPag] (  [IdCondPag] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_CondicaoPagamento] PRIMARY KEY ([IdCondPag]))
*/
