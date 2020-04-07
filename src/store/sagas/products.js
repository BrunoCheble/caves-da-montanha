import { put, select } from 'redux-saga/effects';

import ProductActions from '../ducks/products';

import { documentModel, productModel } from '~/services/models/autoload';

export function* loadProduct(search) {
    try {

        const id_cab = yield select(state => state.product.document);

        let listProduct = [];

        if (id_cab !== null) {
            const document = yield documentModel.findOne(id_cab);
            listProduct = yield productModel.findAllByDocument(search.search, id_cab, document.id_tipo_cliente);
        }
        else {
            listProduct = yield productModel.findAll(search.search);
        }

        yield put(ProductActions.loadProductSuccess(listProduct));
    } catch (error) {
        yield put(ProductActions.loadProductFailure());
    }
}

export function* loadViewProduct(data) {

    try {

        let product = data.data;

        const attachment = yield productModel.findAttachmentByProduct(product.id_artigo, 'FICHATECNICA');
        
        yield put(ProductActions.loadProductSessionSuccess({...product, attachment}));
        yield put(ProductActions.loadDatasheetSuccess(yield productModel.findOneDatasheet(product.id)));
        yield put(ProductActions.loadAssociatedProductSuccess(yield productModel.findAllAssociates(product.id)));
        yield put(ProductActions.loadConcurrentProductSuccess(yield productModel.findAllAssociates(product.id)));

    } catch (error) {
        yield put(ProductActions.loadAssociatedProductFailure());
    }
}
/*
export function* loadAssociatedProduct(data) {

    try {
        const dataBase = new Database();
        const productModel = new ProductModel(dataBase.db);
        yield put(ProductActions.loadAssociatedProductSuccess( yield productModel.findAllAssociates(data.id) ));
    } catch (error) {
        yield put(ProductActions.loadAssociatedProductFailure());
    }
}

export function* loadDatasheet(id) {
    try {
        const dataBase = new Database();
        const productModel = new ProductModel(dataBase.db);
        yield put(ProductActions.loadDatasheetSuccess(yield productModel.findOneDatasheet(id.id)));
    } catch (error) {
        yield put(ProductActions.loadProductFailure());
    }
}
*/
/*

CREATE TABLE [Vendedor] (  [IdVendedor] uniqueidentifier NOT NULL, [VendedorERP] nvarchar(50) NOT NULL COLLATE NOCASE, [Nome] nvarchar(100) NOT NULL COLLATE NOCASE, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_Vendedor] PRIMARY KEY ([IdVendedor]))
CREATE TABLE [VendaIndiretaCab] (  [IdCab] uniqueidentifier NOT NULL, [Data] datetime NOT NULL, [IdEntidadeExterna] uniqueidentifier NULL, [IdClienteERP] uniqueidentifier NULL, [IdPromotora] uniqueidentifier NULL, [IdVendedorClienteERP] uniqueidentifier NULL, [IdVendedor] uniqueidentifier NULL, [TransferOrder] bit NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_VendaIndiretaCab] PRIMARY KEY ([IdCab]), CONSTRAINT [FK_VendaIndiretaCab_Vendedor] FOREIGN KEY ([IdVendedor]) REFERENCES [Vendedor] ([IdVendedor]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [TipoTransacao] (  [IdTipoTransacao] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NOT NULL COLLATE NOCASE, CONSTRAINT [PK_TipoTransacao] PRIMARY KEY ([IdTipoTransacao]))
CREATE TABLE [TipoRelacaoContacto] (  [IdTipoRelacaoContacto] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoRelacaoConstacto] PRIMARY KEY ([IdTipoRelacaoContacto]))
CREATE TABLE [TipoPerfil] (  [IdTipoPerfil] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoUtilizador] PRIMARY KEY ([IdTipoPerfil]))
CREATE TABLE [TipoEntidadeExterna] (  [IdTipoEntidadeExterna] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoEntidadeExterna] PRIMARY KEY ([IdTipoEntidadeExterna]))
CREATE TABLE [TipoEntidade] (  [IdTipoEntidade] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoEntidade] PRIMARY KEY ([IdTipoEntidade]))
CREATE TABLE [TipoCliente] (  [IdTipoCliente] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoCliente] PRIMARY KEY ([IdTipoCliente]))
CREATE TABLE [TipoAnexo] (  [IdTipoAnexo] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoAnexo] PRIMARY KEY ([IdTipoAnexo]))
CREATE TABLE [Pais] (  [IdPais] nvarchar(15) NOT NULL, [PaisERP] nvarchar(50) NULL COLLATE NOCASE, [Descricao] nvarchar(50) NULL COLLATE NOCASE, [NOrdem] int NULL, CONSTRAINT [PK_Pais] PRIMARY KEY ([IdPais]))
CREATE TABLE [ObjetivoRegra] (  [Regra] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NOT NULL COLLATE NOCASE, CONSTRAINT [PK_ObjetivoRegra] PRIMARY KEY ([Regra]))
CREATE TABLE [ObjetivoRegraMetrica] (  [Regra] nvarchar(15) NOT NULL, [Metrica] nvarchar(15) NOT NULL COLLATE NOCASE, [Descricao] nvarchar(50) NOT NULL COLLATE NOCASE, [TipoValor] nvarchar(1) NULL COLLATE NOCASE, CONSTRAINT [PK_ObjetivoRegraMetrica] PRIMARY KEY ([Regra],[Metrica]), CONSTRAINT [FK_ObjetivoRegraMetrica_ObjetivoRegra] FOREIGN KEY ([Regra]) REFERENCES [ObjetivoRegra] ([Regra]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [ObjetivoPeriodo] (  [Periodo] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NOT NULL COLLATE NOCASE, CONSTRAINT [PK_ObjetivoPeriodo] PRIMARY KEY ([Periodo]))
CREATE TABLE [ObjetivoVenda] (  [Id] uniqueidentifier NOT NULL, [Periodo] nvarchar(15) NOT NULL COLLATE NOCASE, [Regra] nvarchar(15) NOT NULL COLLATE NOCASE, [Metrica] nvarchar(15) NOT NULL COLLATE NOCASE, [CampoChave1] nvarchar(50) NOT NULL COLLATE NOCASE, [CampoChave2] nvarchar(50) NOT NULL COLLATE NOCASE, [Valor] float NULL, CONSTRAINT [FK_ObjetivoVenda_ObjetivoPeriodo] FOREIGN KEY ([Periodo]) REFERENCES [ObjetivoPeriodo] ([Periodo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_ObjetivoVenda_ObjetivoRegraMetrica] FOREIGN KEY ([Regra], [Metrica]) REFERENCES [ObjetivoRegraMetrica] ([Regra], [Metrica]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [Iva] (  [IdIva] uniqueidentifier NOT NULL, [IvaErp] nvarchar(50) NULL COLLATE NOCASE, [Descricao] nvarchar(50) NULL COLLATE NOCASE, [Taxa] float NULL, CONSTRAINT [PK_Iva] PRIMARY KEY ([IdIva]))
CREATE TABLE [EntidadeMorada] (  [IdEntidadeMorada] uniqueidentifier NOT NULL, [TipoEntidade] nvarchar(15) NOT NULL COLLATE NOCASE, [IdEntidade] uniqueidentifier NOT NULL, [MoradaPrincipal] bit NOT NULL, [Morada] nvarchar(100) NULL COLLATE NOCASE, [Localidade] nvarchar(100) NULL COLLATE NOCASE, [CodPostal] nvarchar(20) NULL COLLATE NOCASE, [CodPostalLocal] nvarchar(100) NULL COLLATE NOCASE, [Distrito] nvarchar(15) NULL COLLATE NOCASE, [Pais] nvarchar(15) NULL COLLATE NOCASE, [Latitude] float NULL, [Longitude] float NULL, [IdContacto] uniqueidentifier NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_EntidadeMorada] PRIMARY KEY ([IdEntidadeMorada]), CONSTRAINT [FK_EntidadeMorada_TipoEntidade] FOREIGN KEY ([TipoEntidade]) REFERENCES [TipoEntidade] ([IdTipoEntidade]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [EntidadeMoradaHorario] (  [IdMoradaHorario] uniqueidentifier NOT NULL, [IdEntidadeMorada] uniqueidentifier NOT NULL, [Dia] smallint NOT NULL, [HoraInicio1] datetime NULL, [HoraFim1] datetime NULL, [HoraInicio2] datetime NULL, [HoraFim2] datetime NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_MoradaHorario] PRIMARY KEY ([IdMoradaHorario]), CONSTRAINT [FK_EntidadeMoradaHorario_EntidadeMorada] FOREIGN KEY ([IdEntidadeMorada]) REFERENCES [EntidadeMorada] ([IdEntidadeMorada]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_EntidadeMoradaHorario_Utilizador1] FOREIGN KEY ([IdUtilizador]) REFERENCES [Utilizador] ([IdUtilizador]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [Distrito] (  [IdDistrito] nvarchar(15) NOT NULL, [DistritoERP] nvarchar(50) NULL COLLATE NOCASE, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_Distrito] PRIMARY KEY ([IdDistrito]))
CREATE TABLE [Contacto] (  [IdContacto] uniqueidentifier NOT NULL, [Nome] nvarchar(100) NULL COLLATE NOCASE, [Email] nvarchar(200) NULL COLLATE NOCASE, [Telemovel] nvarchar(20) NULL COLLATE NOCASE, [Observacoes] ntext NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_Contacto] PRIMARY KEY ([IdContacto]), CONSTRAINT [FK_Contacto_Utilizador] FOREIGN KEY ([IdUtilizador]) REFERENCES [Utilizador] ([IdUtilizador]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [ContactoEntidade] (  [IdContacto] uniqueidentifier NOT NULL, [TipoEntidade] nvarchar(15) NOT NULL COLLATE NOCASE, [IdEntidade] uniqueidentifier NOT NULL, [TipoRelacaoContacto] nvarchar(15) NULL COLLATE NOCASE, CONSTRAINT [PK_ContactoEntidade] PRIMARY KEY ([IdContacto],[TipoEntidade],[IdEntidade]), CONSTRAINT [FK_ContactoEntidade_Contacto] FOREIGN KEY ([IdContacto]) REFERENCES [Contacto] ([IdContacto]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_ContactoEntidade_TipoEntidade] FOREIGN KEY ([TipoEntidade]) REFERENCES [TipoEntidade] ([IdTipoEntidade]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_ContactoEntidade_TipoRelacaoContacto] FOREIGN KEY ([TipoRelacaoContacto]) REFERENCES [TipoRelacaoContacto] ([IdTipoRelacaoContacto]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [CondPag] (  [IdCondPag] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_CondicaoPagamento] PRIMARY KEY ([IdCondPag]))
CREATE TABLE [CodigoPostal] (  [Pais] nvarchar(15) NOT NULL, [IdCodigoPostal] nvarchar(15) NOT NULL COLLATE NOCASE, [Descricao] nvarchar(100) NULL COLLATE NOCASE, CONSTRAINT [PK_CodigoPostal] PRIMARY KEY ([Pais],[IdCodigoPostal]))
CREATE TABLE [Cliente] (  [IdCliente] uniqueidentifier NOT NULL, [ClienteERP] nvarchar(50) NULL COLLATE NOCASE, [Nome] nvarchar(100) NULL COLLATE NOCASE, [NIF] nvarchar(50) NULL COLLATE NOCASE, [TipoCliente] nvarchar(15) NULL COLLATE NOCASE, [LimiteSaldoDias] smallint NULL, [LimiteSaldoValor] float NULL, [CondPag] nvarchar(15) NULL COLLATE NOCASE, [IdVendedor] uniqueidentifier NULL, [Observacoes] ntext NULL, [Telefone] nvarchar(20) NULL COLLATE NOCASE, [Email] nvarchar(200) NULL COLLATE NOCASE, [EnderecoWeb] nvarchar(200) NULL COLLATE NOCASE, [ValorPendMaior90DiasSemCheque] float NULL, [ValorPendMaior90DiasComCheque] float NULL, [ValorPendMenor90DiasSemCheque] float NULL, [ValorPendMenor90DiasComCheque] float NULL, [ValorContencioso] float NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_Cliente] PRIMARY KEY ([IdCliente]), CONSTRAINT [FK_Cliente_CondicaoPagamento] FOREIGN KEY ([CondPag]) REFERENCES [CondPag] ([IdCondPag]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_Cliente_TipoCliente] FOREIGN KEY ([TipoCliente]) REFERENCES [TipoCliente] ([IdTipoCliente]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_Cliente_Utilizador] FOREIGN KEY ([IdUtilizador]) REFERENCES [Utilizador] ([IdUtilizador]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_Cliente_Vendedor] FOREIGN KEY ([IdVendedor]) REFERENCES [Vendedor] ([IdVendedor]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [ClassificacaoEntidade] (  [IdClassificacaoEntidade] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_ClassificacaoEntidade_1] PRIMARY KEY ([IdClassificacaoEntidade]))
CREATE TABLE [CategoriaEntidadeExterna] (  [IdCategoriaEntidadeExterna] nvarchar(15) NOT NULL, [IdTipoEntidadeExterna] nvarchar(15) NOT NULL COLLATE NOCASE, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_CategoriaEntidadeExterna] PRIMARY KEY ([IdCategoriaEntidadeExterna],[IdTipoEntidadeExterna]), CONSTRAINT [FK_CategoriaEntidadeExterna_TipoEntidadeExterna] FOREIGN KEY ([IdTipoEntidadeExterna]) REFERENCES [TipoEntidadeExterna] ([IdTipoEntidadeExterna]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [EntidadeExterna] (  [IdEntidadeExterna] uniqueidentifier NOT NULL, [EntidadeExternaERP] nvarchar(50) NULL COLLATE NOCASE, [IdTipoEntidadeExterna] nvarchar(15) NULL COLLATE NOCASE, [IdCategoriaEntidadeExterna] nvarchar(15) NULL COLLATE NOCASE, [IdClassificacaoEntidade] nvarchar(15) NULL COLLATE NOCASE, [NomeFiscal] nvarchar(100) NULL COLLATE NOCASE, [NomeComercial] nvarchar(100) NULL COLLATE NOCASE, [IdVendedor] uniqueidentifier NULL, [Telefone] nvarchar(20) NULL COLLATE NOCASE, [Email] nvarchar(200) NULL COLLATE NOCASE, [Observacoes] ntext NULL, [IdUtilizador] uniqueidentifier NULL, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_EntidadeExterna] PRIMARY KEY ([IdEntidadeExterna]), CONSTRAINT [FK_EntidadeExterna_CategoriaEntidadeExterna] FOREIGN KEY ([IdCategoriaEntidadeExterna], [IdTipoEntidadeExterna]) REFERENCES [CategoriaEntidadeExterna] ([IdCategoriaEntidadeExterna], [IdTipoEntidadeExterna]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_EntidadeExterna_ClassificacaoEntidade] FOREIGN KEY ([IdClassificacaoEntidade]) REFERENCES [ClassificacaoEntidade] ([IdClassificacaoEntidade]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_EntidadeExterna_TipoEntidadeExterna] FOREIGN KEY ([IdTipoEntidadeExterna]) REFERENCES [TipoEntidadeExterna] ([IdTipoEntidadeExterna]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [Artigo] (  [IdArtigo] uniqueidentifier NOT NULL, [ArtigoERP] nvarchar(50) NULL COLLATE NOCASE, [Descricao] nvarchar(100) NULL COLLATE NOCASE, [Marca] nvarchar(50) NULL COLLATE NOCASE, [Imagem] nvarchar(50) NULL COLLATE NOCASE, [Familia] nvarchar(50) NULL COLLATE NOCASE, [StockAtual] float NULL, [PrecoCustoVendedor] float NULL, [PrecoTabela] float NULL, [PrecoConsumidorFinal] float NULL, [PrecoHoreca] float NULL, [PrecoGarrafeira] float NULL, [PrecoCash] float NULL, [PrecoDistribuidor] float NULL, [PrecoVendaGrandeSuperficie] float NULL, [TaxaIva] float NULL, [CategoriaImposto] nvarchar(10) NULL COLLATE NOCASE, [TaxaImposto] float NULL, [Volume] float NULL, [Grau] float NULL, [ValorTaxa] float NULL, [ProtocoloApresentacao] ntext NULL, [EAN] nvarchar(50) NULL COLLATE NOCASE, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_Artigo] PRIMARY KEY ([IdArtigo]))
CREATE TABLE [VendaCab] (  [Id] uniqueidentifier NOT NULL, [IdCliente] uniqueidentifier NOT NULL, [IdDocErp] nvarchar(50) NULL COLLATE NOCASE, [Data] datetime NOT NULL, [IdVendedor] uniqueidentifier NOT NULL, [TotalMercadoria] float NULL, [TotalDesconto] float NULL, [TotalIEC] float NULL, [TotalIVA] float NULL, [TotalDocumento] float NULL, [IdMoradaEntrega] uniqueidentifier NULL, [IdTipoTransacao] nvarchar(15) NULL COLLATE NOCASE, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_VendaCab] PRIMARY KEY ([Id]), CONSTRAINT [FK_VendaCab_Cliente] FOREIGN KEY ([IdCliente]) REFERENCES [Cliente] ([IdCliente]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaCab_EntidadeMorada] FOREIGN KEY ([IdMoradaEntrega]) REFERENCES [EntidadeMorada] ([IdEntidadeMorada]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaCab_TipoTransacao] FOREIGN KEY ([IdTipoTransacao]) REFERENCES [TipoTransacao] ([IdTipoTransacao]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaCab_Vendedor] FOREIGN KEY ([IdVendedor]) REFERENCES [Vendedor] ([IdVendedor]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [VendaLin] (  [Id] uniqueidentifier NOT NULL, [IdVendaCab] uniqueidentifier NOT NULL, [IdArtigo] uniqueidentifier NOT NULL, [QuantidadeVenda] float NOT NULL, [QuantidadeOferta] float NOT NULL, [Preco] float NOT NULL, [Desconto] float NOT NULL, [ValorIEC] float NOT NULL, [IdIva] uniqueidentifier NOT NULL, [TaxaIva] float NOT NULL, [TotalLiquido] float NOT NULL, CONSTRAINT [PK_VendaLin] PRIMARY KEY ([Id]), CONSTRAINT [FK_VendaLin_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaLin_Iva] FOREIGN KEY ([IdIva]) REFERENCES [Iva] ([IdIva]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaLin_VendaCab] FOREIGN KEY ([IdVendaCab]) REFERENCES [VendaCab] ([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [VendaIndiretaLin] (  [IdCab] uniqueidentifier NOT NULL, [Id] uniqueidentifier NOT NULL, [IdArtigo] uniqueidentifier NOT NULL, [QuantidadeVenda] float NOT NULL, [QuantidadeOferta] float NOT NULL, [Preco] float NOT NULL, [Acordo] bit NULL, [Promocao] bit NULL, [ArtigoEmCarta] bit NULL, [ArtigoServico] bit NULL, CONSTRAINT [PK_VendaIndiretaLin] PRIMARY KEY ([IdCab],[Id]), CONSTRAINT [FK_VendaIndiretaLin_Artigo1] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaIndiretaLin_VendaIndiretaCab1] FOREIGN KEY ([IdCab]) REFERENCES [VendaIndiretaCab] ([IdCab]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [ArtigoFichaTecnica] (  [IdArtigo] uniqueidentifier NOT NULL, [Regiao] nvarchar(50) NULL COLLATE NOCASE, [Classificacao] nvarchar(50) NULL COLLATE NOCASE, [TipoProduto] nvarchar(50) NULL COLLATE NOCASE, [Ano] nvarchar(50) NULL COLLATE NOCASE, [Castas] nvarchar(50) NULL COLLATE NOCASE, [Vinificacao] nvarchar(50) NULL COLLATE NOCASE, [Producao] nvarchar(50) NULL COLLATE NOCASE, [Engarrafamento] nvarchar(50) NULL COLLATE NOCASE, [Graduacao] nvarchar(50) NULL COLLATE NOCASE, [AcidezTotal] nvarchar(50) NULL COLLATE NOCASE, [AcucarTotal] nvarchar(50) NULL COLLATE NOCASE, [NotaProva] nvarchar(50) NULL COLLATE NOCASE, [MaturacaoEstagio] nvarchar(50) NULL COLLATE NOCASE, [Conservacao] nvarchar(50) NULL COLLATE NOCASE, [Consumo] nvarchar(50) NULL COLLATE NOCASE, [Gastronomia] nvarchar(50) NULL COLLATE NOCASE, [Ingredientes] nvarchar(50) NULL COLLATE NOCASE, [Baume] nvarchar(50) NULL COLLATE NOCASE, [Brix] nvarchar(50) NULL COLLATE NOCASE, [Metanol] nvarchar(50) NULL COLLATE NOCASE, [Capacidade] nvarchar(50) NULL COLLATE NOCASE, [Peso] nvarchar(50) NULL COLLATE NOCASE, [Altura] nvarchar(50) NULL COLLATE NOCASE, [Diametro] nvarchar(50) NULL COLLATE NOCASE, [NumGarrafasCaixa] nvarchar(50) NULL COLLATE NOCASE, [PesoCaixa] nvarchar(50) NULL COLLATE NOCASE, [NumGarrafasPalete] nvarchar(50) NULL COLLATE NOCASE, [NumCaixasPalete] nvarchar(50) NULL COLLATE NOCASE, [AlturaPalete] nvarchar(50) NULL COLLATE NOCASE, [ITF] nvarchar(50) NULL COLLATE NOCASE, [PesoTotalPalete] nvarchar(50) NULL COLLATE NOCASE, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_ArtigoFichaTecnica] PRIMARY KEY ([IdArtigo]), CONSTRAINT [FK_ArtigoFichaTecnica_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [ArtigoClientePreco] (  [IdArtigo] uniqueidentifier NOT NULL, [IdCliente] uniqueidentifier NOT NULL, [Preco] float NOT NULL, CONSTRAINT [PK_ArtigoClientePreco] PRIMARY KEY ([IdArtigo],[IdCliente]), CONSTRAINT [FK_ArtigoClientePreco_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_ArtigoClientePreco_Cliente] FOREIGN KEY ([IdCliente]) REFERENCES [Cliente] ([IdCliente]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [ArtigoArtigoConcorrente] (  [IdArtigoConcorrente] uniqueidentifier NOT NULL, [IdArtigo] uniqueidentifier NOT NULL, [Descricao] nvarchar(100) NOT NULL COLLATE NOCASE, [Preco] float NOT NULL, [TipoEntidadeExterna] nvarchar(15) NULL COLLATE NOCASE, [EntidadeExternaId] uniqueidentifier NULL, CONSTRAINT [PK_ArtigoArtigoConcorrente_1] PRIMARY KEY ([IdArtigoConcorrente]), CONSTRAINT [FK_ArtigoArtigoConcorrente_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [ArtigoArtigoAssociado] (  [IdArtigo] uniqueidentifier NOT NULL, [IdArtigoAssociado] uniqueidentifier NOT NULL, CONSTRAINT [PK_ArtigoArtigoAssociado] PRIMARY KEY ([IdArtigo],[IdArtigoAssociado]), CONSTRAINT [FK_ArtigoArtigoAssociado_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [ArtigoAnexo] (  [IdArtigoAnexo] uniqueidentifier NOT NULL, [IdArtigo] uniqueidentifier NOT NULL, [Anexo] nvarchar(50) NOT NULL COLLATE NOCASE, [IdTipoAnexo] nvarchar(15) NOT NULL COLLATE NOCASE, CONSTRAINT [PK_ArtigoAnexo_1] PRIMARY KEY ([IdArtigoAnexo]), CONSTRAINT [FK_ArtigoAnexo_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_ArtigoAnexo_TipoAnexo] FOREIGN KEY ([IdTipoAnexo]) REFERENCES [TipoAnexo] ([IdTipoAnexo]) ON DELETE NO ACTION ON UPDATE NO ACTION)

*/