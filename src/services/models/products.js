export default class ProductModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    findAttachmentByProduct = (id, type) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT Anexo as anexo FROM ArtigoAnexo WHERE IdArtigo = ? AND IdTipoAnexo = ?',
                [id, type],
                (tx, results) => {
                    let data = id.replace(/-/g,'').toLowerCase()+'.pdf';
                    if (results.rows.length > 0) {
                        data = results.rows.item(0).anexo;
                    }
                    resolve(data);
                }
            );
        });
    });

    findAllConcurrents = id => new Promise((resolve, reject) => {

        const fields = [
            'a.IdArtigo as id',
            'a.IdArtigo as id_artigo',
            'a.ArtigoERP as codigo',
            'a.Descricao as nome',
            'a.Marca as marca',
            'a.Imagem as imagem',
            'f.Descricao as familia',
            'a.StockAtual as stock_atual',
            'a.PrecoTabela as preco',
            'a.PrecoCustoVendedor as preco_custo_vendedor',
            'a.PrecoTabela as preco_tabela',
            'a.PrecoConsumidorFinal as preco_consumidor_final',
            'a.PrecoHoreca as preco_horeca',
            'a.PrecoGarrafeira as preco_garrafeira',
            'a.PrecoCash as preco_cash',
            'a.PrecoDistribuidor as preco_distribuidor',
            'a.PrecoVendaGrandeSuperficie as preco_venda_grande_superfice',
            'a.PrecoMercadoInternacional as preco_mercado_internacional',
            'a.TaxaIva as tava_iva',
            'a.IdIva as id_iva',
            'a.CategoriaImposto as categoria_imposto',
            'a.TaxaImposto as taxa_imposto',
            'a.Volume as volume',
            'a.Grau as grau',
            'a.ValorTaxa as valor_taxa',
            'a.ProtocoloApresentacao as protocolo_apresentacao',
            'a.EAN as ean',
            'a.DataUltimaAtualizacao as data_ultima_atualizacao',
            'aft.Regiao as regiao',
            'aft.Ano as ano',
            'aft.Castas as castas',
            'aft.NotaProva as nota_prova',
            'aft.NotaProva as nota_prova',
            'aft.Gastronomia as gastronomia',
            '(CASE WHEN aft.NumGarrafasPalete = 0 THEN 1 ELSE IFNULL(aft.NumGarrafasPalete,1) END) as num_garrafas_palete',
            '(CASE WHEN aft.NumGarrafasCaixa = 0 THEN 1 ELSE IFNULL(aft.NumGarrafasCaixa,1) END) as num_garrafas_caixa',
        ];

        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM ArtigoArtigoConcorrente aa'
                + ' LEFT JOIN Artigo a ON aa.IdArtigoAssociado = a.IdArtigo'
                + ' LEFT JOIN ArtigoFichaTecnica aft ON aft.IdArtigo = a.IdArtigo'
                + ' LEFT JOIN Familia f ON f.IdFamilia = a.Familia'
                + ' WHERE aa.IdArtigo = ?',
                [id],
                (tx, results) => {
                    let data = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        data.push(results.rows.item(i));
                    }
                    console.log(data);
                    resolve(data);
                }
            );
        });
    });

    findOne = id => new Promise((resolve, reject) => {
        const fields = [
            'a.IdArtigo as id',
            'a.IdArtigo as id_artigo',
            'a.ArtigoERP as codigo',
            'a.Descricao as nome',
            'a.Marca as marca',
            'a.Imagem as imagem',
            'f.Descricao as familia',
            'a.StockAtual as stock_atual',
            'a.PrecoTabela as preco',
            'a.PrecoCustoVendedor as preco_custo_vendedor',
            'a.PrecoTabela as preco_tabela',
            'a.PrecoConsumidorFinal as preco_consumidor_final',
            'a.PrecoHoreca as preco_horeca',
            'a.PrecoGarrafeira as preco_garrafeira',
            'a.PrecoCash as preco_cash',
            'a.PrecoDistribuidor as preco_distribuidor',
            'a.PrecoVendaGrandeSuperficie as preco_venda_grande_superfice',
            'a.PrecoMercadoInternacional as preco_mercado_internacional',
            'a.ValorTaxa as valor_taxa',
            'a.TaxaImposto as taxa_imposto',
            'a.ProtocoloApresentacao as protocolo_apresentacao',
            'a.EAN as ean',
            'aft.Regiao as regiao',
            'aft.Ano as ano',
            'aft.Castas as castas',
            'aft.NotaProva as nota_prova',
            'aft.NotaProva as nota_prova',
            'aft.Gastronomia as gastronomia'
        ];

        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM Artigo a'
                + ' LEFT JOIN ArtigoFichaTecnica aft ON aft.IdArtigo = a.IdArtigo'
                + ' LEFT JOIN Familia f ON f.IdFamilia = a.Familia'
                + ' WHERE a.IdArtigo = ?',
                [id],
                (tx, results) => {
                    let data = { id: null };
                    if (results.rows.length == 1) {
                        data = results.rows.item(0);
                    }
                    resolve(data);
                }
            );
        });
    });

    findAllAssociates = id => new Promise((resolve, reject) => {

        const fields = [
            'a.IdArtigo as id',
            'a.IdArtigo as id_artigo',
            'a.ArtigoERP as codigo',
            'a.Descricao as nome',
            'a.Marca as marca',
            'a.Imagem as imagem',
            'f.Descricao as familia',
            'a.StockAtual as stock_atual',
            'a.PrecoTabela as preco',
            'a.PrecoCustoVendedor as preco_custo_vendedor',
            'a.PrecoTabela as preco_tabela',
            'a.PrecoConsumidorFinal as preco_consumidor_final',
            'a.PrecoHoreca as preco_horeca',
            'a.PrecoGarrafeira as preco_garrafeira',
            'a.PrecoCash as preco_cash',
            'a.PrecoDistribuidor as preco_distribuidor',
            'a.PrecoVendaGrandeSuperficie as preco_venda_grande_superfice',
            'a.PrecoMercadoInternacional as preco_mercado_internacional',
            'a.TaxaIva as tava_iva',
            'a.IdIva as id_iva',
            'a.CategoriaImposto as categoria_imposto',
            'a.TaxaImposto as taxa_imposto',
            'a.Volume as volume',
            'a.Grau as grau',
            'a.ValorTaxa as valor_taxa',
            'a.ProtocoloApresentacao as protocolo_apresentacao',
            'a.EAN as ean',
            'a.DataUltimaAtualizacao as data_ultima_atualizacao',
            'aft.Regiao as regiao',
            'aft.Ano as ano',
            'aft.Castas as castas',
            'aft.NotaProva as nota_prova',
            'aft.NotaProva as nota_prova',
            'aft.Gastronomia as gastronomia',
            '(CASE WHEN aft.NumGarrafasPalete = 0 THEN 1 ELSE IFNULL(aft.NumGarrafasPalete,1) END) as num_garrafas_palete',
            '(CASE WHEN aft.NumGarrafasCaixa = 0 THEN 1 ELSE IFNULL(aft.NumGarrafasCaixa,1) END) as num_garrafas_caixa',
        ];

        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM ArtigoArtigoAssociado aa'
                + ' LEFT JOIN Artigo a ON aa.IdArtigoAssociado = a.IdArtigo'
                + ' LEFT JOIN ArtigoFichaTecnica aft ON aft.IdArtigo = a.IdArtigo'
                + ' LEFT JOIN Familia f ON f.IdFamilia = a.Familia'
                + ' WHERE aa.IdArtigo = ?',
                [id],
                (tx, results) => {
                    let data = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        data.push(results.rows.item(i));
                    }
                    resolve(data);
                }
            );
        });
    });

    findOneDatasheet = id => new Promise((resolve, reject) => {
        const fields = [
            'aft.Regiao as regiao',
            'aft.Classificacao as classificacao',
            'aft.TipoProduto as tipo_produto',
            'aft.Ano as ano',
            'aft.Castas as castas',
            'aft.Vinificacao as vinificacao',
            'aft.Producao as producao',
            'aft.Engarrafamento as engarrafamento',
            'aft.Graduacao as graduacao',
            'aft.AcidezTotal as acidez_total',
            'aft.AcucarTotal as acucar_total',
            'aft.MaturacaoEstagio as maturacao_estagio',
            'aft.Conservacao as conservacao',
            'aft.Consumo as consumo',
            'aft.NotaProva as nota_prova',
            'aft.Ingredientes as ingredientes',
            'aft.Baume as baume',
            'aft.Brix as brix',
            'aft.Metanol as metanol',
            'aft.Peso as peso',
            'aft.Altura as altura',
            'aft.Diametro as diametro',
            'aft.NumGarrafasCaixa as num_garrafas_caixa',
            'aft.PesoCaixa as peso_caixa',
            'aft.NumGarrafasPalete as num_garrafas_palete',
            'aft.NumCaixasPalete as num_caixas_palete',
            'aft.AlturaPalete as altura_palete',
            'aft.ITF as itf',
            'aft.Gastronomia as gastronomia',
            'aft.PesoTotalPalete as peso_total_palete',
            'a.EAN as ean',
            'aft.Capacidade as capacidade'
        ];

        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM ArtigoFichaTecnica aft JOIN Artigo a ON a.IdArtigo = aft.IdArtigo WHERE aft.IdArtigo = ?',
                [id],
                (tx, results) => {
                    let data = {};
                    if (results.rows.length == 1) {
                        data = results.rows.item(0);
                    }
                    resolve(data);
                }
            );
        });
    });

    findAll = search => new Promise((resolve, reject) => {

        const fields = [
            'a.IdArtigo as id',
            'a.IdArtigo as id_artigo',
            'a.ArtigoERP as codigo',
            'a.Descricao as nome',
            'a.Marca as marca',
            'a.Imagem as imagem',
            'f.Descricao as familia',
            'a.StockAtual as stock_atual',
            'a.PrecoTabela as preco',
            'a.PrecoCustoVendedor as preco_custo_vendedor',
            'a.PrecoTabela as preco_tabela',
            'a.PrecoConsumidorFinal as preco_consumidor_final',
            'a.PrecoHoreca as preco_horeca',
            'a.PrecoGarrafeira as preco_garrafeira',
            'a.PrecoCash as preco_cash',
            'a.PrecoDistribuidor as preco_distribuidor',
            'a.PrecoVendaGrandeSuperficie as preco_venda_grande_superfice',
            'a.PrecoMercadoInternacional as preco_mercado_internacional',
            'a.TaxaIva as taxa_iva',
            'a.IdIva as id_iva',
            'a.CategoriaImposto as categoria_imposto',
            'a.TaxaImposto as taxa_imposto',
            'a.Volume as volume',
            'a.Grau as grau',
            'a.ValorTaxa as valor_taxa',
            'a.ProtocoloApresentacao as protocolo_apresentacao',
            'a.EAN as ean',
            'a.DataUltimaAtualizacao as data_ultima_atualizacao',
            'aft.Regiao as regiao',
            'aft.Ano as ano',
            'aft.Castas as castas',
            'aft.NotaProva as nota_prova',
            'aft.NotaProva as nota_prova',
            'aft.Gastronomia as gastronomia',
            '(CASE WHEN (aft.NumGarrafasPalete = 0 OR IFNULL(aft.NumGarrafasPalete,0) = 0) THEN 1 ELSE aft.NumGarrafasPalete END) as num_garrafas_palete',
            '(CASE WHEN (aft.NumGarrafasCaixa = 0 OR IFNULL(aft.NumGarrafasCaixa,0) = 0) THEN 1 ELSE aft.NumGarrafasCaixa END) as num_garrafas_caixa',
        ];

        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM Artigo a'
                + ' LEFT JOIN ArtigoFichaTecnica aft ON aft.IdArtigo = a.IdArtigo'
                + ' LEFT JOIN Familia f ON f.IdFamilia = a.Familia'
                + ' WHERE IFNULL(?,"") = "" OR (UPPER(a.Descricao) LIKE UPPER(?) OR a.ArtigoERP LIKE ? OR a.EAN = ?)'
                + ' ORDER BY a.ArtigoERP',
                [search, "%" + search + "%", search + "%", search],
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

    findAllByDocument = (search, document, typeCustomer) => new Promise((resolve, reject) => {

        const fields = [
            'vl.Id as document_item',
            'vl.Id as id',
            'vl.IdVendaCab as id_cab',
            'vl.TotalLiquido as total',
            'vl.ValorIEC as vl_iec',
            'IFNULL(vl.Desconto,0) as desconto',
            'IFNULL(vl.QuantidadeVenda,0) as quantidade',
            'IFNULL(vl.QuantidadeOferta,0) as oferta',
            'IFNULL(vl.Preco,0) as preco',
            'a.PrecoTabela as preco_recomendado',
            'a.IdArtigo as id',
            'a.IdArtigo as id_artigo',
            'a.ArtigoERP as codigo',
            'a.Descricao as nome',
            'a.Marca as marca',
            'a.Imagem as imagem',
            'f.Descricao as familia',
            'a.StockAtual as stock_atual',
            'a.PrecoCustoVendedor as preco_custo_vendedor',
            'a.PrecoTabela as preco_tabela',
            'a.PrecoConsumidorFinal as preco_consumidor_final',
            'a.PrecoHoreca as preco_horeca',
            'a.PrecoGarrafeira as preco_garrafeira',
            'a.PrecoCash as preco_cash',
            'a.PrecoDistribuidor as preco_distribuidor',
            'a.PrecoVendaGrandeSuperficie as preco_venda_grande_superfice',
            'a.PrecoMercadoInternacional as preco_mercado_internacional',
            'a.TaxaIva as taxa_iva',
            'a.IdIva as id_iva',
            'a.CategoriaImposto as categoria_imposto',
            'a.TaxaImposto as taxa_imposto',
            'a.Volume as volume',
            'a.Grau as grau',
            'a.ValorTaxa as valor_taxa',
            'a.ProtocoloApresentacao as protocolo_apresentacao',
            'a.EAN as ean',
            'a.DataUltimaAtualizacao as data_ultima_atualizacao',
            '(CASE WHEN (aft.NumGarrafasPalete = 0 OR IFNULL(aft.NumGarrafasPalete,0) = 0) THEN 1 ELSE aft.NumGarrafasPalete END) as num_garrafas_palete',
            '(CASE WHEN (aft.NumGarrafasCaixa = 0 OR IFNULL(aft.NumGarrafasCaixa,0) = 0) THEN 1 ELSE aft.NumGarrafasCaixa END) as num_garrafas_caixa',
            'IFNULL(acp.Preco,0) as preco_especial'
        ];

        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM Artigo a'
                + ' LEFT JOIN ArtigoFichaTecnica aft ON aft.IdArtigo = a.IdArtigo'
                + ' LEFT JOIN VendaCab vc ON vc.Id = ?'
                + ' LEFT JOIN VendaLin vl ON vl.IdArtigo = a.IdArtigo AND vc.Id = vl.IdVendaCab'
                + ' LEFT JOIN Familia f ON f.IdFamilia = a.Familia'
                + ' LEFT JOIN ArtigoClientePreco acp ON a.IdArtigo = acp.IdArtigo AND acp.IdCliente = vc.IdCliente'
                + ' WHERE IFNULL(?,"") = "" OR (UPPER(a.Descricao) LIKE UPPER(?) OR a.ArtigoERP LIKE ?) ORDER BY vl.IdVendaCab desc, a.ArtigoERP',
                [document, search, "%" + search + "%", search + "%"],
                (tx, results) => {
                    let data = [];

                    for (let i = 0; i < results.rows.length; i++) {
                        let item = results.rows.item(i);

                        switch (typeCustomer) {
                            case 'CONSFINAL':
                                item.preco_recomendado = item.preco_consumidor_final;
                                break;
                            case 'GARRAFEIRA':
                                item.preco_recomendado = item.preco_garrafeira;
                                break;
                            case 'CASH':
                                item.preco_recomendado = item.preco_cash;
                                break;
                            case 'HORECA':
                                item.preco_recomendado = item.preco_horeca;
                                break;
                            case 'DISTRIBUIDOR':
                                item.preco_recomendado = item.preco_distribuidor;
                                break;
                            case 'GRANDESUP':
                                item.preco_recomendado = item.preco_venda_grande_superfice;
                                break;
                            case 'MERCADOINT':     
                                item.preco_recomendado = item.preco_mercado_internacional;
                                break;
                        }

                        if (item.preco_especial != 0) {
                            item.preco_recomendado = item.preco_especial;
                        }

                        if (item.preco == 0) {
                            item.preco = item.preco_recomendado;
                        }

                        if (item.quantidade == 0) {
                            item.quantidade = '';
                        }
                        data.push(item);
                    }

                    resolve(data);
                }
            );
        });
    });

    findAllSpecialPriceByCustomer = (customer) => new Promise((resolve, reject) => {

        const fields = [
            'a.IdArtigo as id',
            'a.ArtigoERP as codigo',
            'a.Descricao as nome',
            'a.Marca as marca',
            'a.Imagem as imagem',
            'ac.Preco as preco'
        ];

        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM ArtigoClientePreco ac'
                + ' JOIN Artigo a ON ac.IdArtigo = a.IdArtigo'
                + ' WHERE ac.IdCliente = ?',
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

    create = data => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Artigo (Descricao,ArtigoERP) VALUES (?,?)',
                [data.nome, data.cod_ean],
                (tx, results) => {
                    resolve(results.insertId);
                }
            );
        });
    });

    update = data => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                'UPDATE Artigo set Descricao = ?, ArtigoERP = ? WHERE IdArtigo = ?',
                [data.nome, data.cod_ean, data.id],
                (tx, results) => {
                    resolve(results);
                }
            );
        });
    });

    delete = id => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Artigo WHERE IdArtigo = ?',
                [id],
                (tx, results) => {
                    resolve(results);
                }
            );
        });
    });
}
/*
CREATE TABLE [Artigo] (  [IdArtigo] uniqueidentifier NOT NULL, [CodigoERP] nvarchar(50) NULL COLLATE NOCASE, [Descricao] nvarchar(100) NULL COLLATE NOCASE, [Marca] nvarchar(50) NULL COLLATE NOCASE, [Imagem] nvarchar(50) NULL COLLATE NOCASE, [Familia] nvarchar(50) NULL COLLATE NOCASE, [StockAtual] float NULL, [PrecoCustoVendedor] float NULL, [PrecoTabela] float NULL, [PrecoConsumidorFinal] float NULL, [PrecoHoreca] float NULL, [PrecoGarrafeira] float NULL, [PrecoCash] float NULL, [PrecoDistribuidor] float NULL, [PrecoVendaGrandeSuperficie] float NULL, [TaxaIva] float NULL, [CategoriaImposto] nvarchar(10) NULL COLLATE NOCASE, [TaxaImposto] float NULL, [Volume] float NULL, [Grau] float NULL, [ValorTaxa] float NULL, [ProtocoloApresentacao] ntext NULL, [EAN] nvarchar(50) NULL COLLATE NOCASE, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_Artigo] PRIMARY KEY ([IdArtigo]))
*//*
CREATE TABLE [ArtigoFichaTecnica] (  [IdArtigo] uniqueidentifier NOT NULL, [Regiao] nvarchar(50) NULL COLLATE NOCASE, [Classificacao] nvarchar(50) NULL COLLATE NOCASE, [TipoProduto] nvarchar(50) NULL COLLATE NOCASE, [Ano] nvarchar(50) NULL COLLATE NOCASE, [Castas] nvarchar(50) NULL COLLATE NOCASE, [Vinificacao] nvarchar(50) NULL COLLATE NOCASE, [Producao] nvarchar(50) NULL COLLATE NOCASE, [Engarrafamento] nvarchar(50) NULL COLLATE NOCASE, [Graduacao] nvarchar(50) NULL COLLATE NOCASE, [AcidezTotal] nvarchar(50) NULL COLLATE NOCASE, [AcucarTotal] nvarchar(50) NULL COLLATE NOCASE, [NotaProva] nvarchar(50) NULL COLLATE NOCASE, [MaturacaoEstagio] nvarchar(50) NULL COLLATE NOCASE, [Conservacao] nvarchar(50) NULL COLLATE NOCASE, [Consumo] nvarchar(50) NULL COLLATE NOCASE, [Gastronomia] nvarchar(50) NULL COLLATE NOCASE, [Ingredientes] nvarchar(50) NULL COLLATE NOCASE, [Baume] nvarchar(50) NULL COLLATE NOCASE, [Brix] nvarchar(50) NULL COLLATE NOCASE, [Metanol] nvarchar(50) NULL COLLATE NOCASE, [Capacidade] nvarchar(50) NULL COLLATE NOCASE, [Peso] nvarchar(50) NULL COLLATE NOCASE, [Altura] nvarchar(50) NULL COLLATE NOCASE, [Diametro] nvarchar(50) NULL COLLATE NOCASE, [NumGarrafasCaixa] nvarchar(50) NULL COLLATE NOCASE, [PesoCaixa] nvarchar(50) NULL COLLATE NOCASE, [NumGarrafasPalete] nvarchar(50) NULL COLLATE NOCASE, [NumCaixasPalete] nvarchar(50) NULL COLLATE NOCASE, [AlturaPalete] nvarchar(50) NULL COLLATE NOCASE, [ITF] nvarchar(50) NULL COLLATE NOCASE, [PesoTotalPalete] nvarchar(50) NULL COLLATE NOCASE, [DataUltimaAtualizacao] datetime NULL, CONSTRAINT [PK_ArtigoFichaTecnica] PRIMARY KEY ([IdArtigo]), CONSTRAINT [FK_ArtigoFichaTecnica_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [ArtigoClientePreco] (  [IdArtigo] uniqueidentifier NOT NULL, [IdCliente] uniqueidentifier NOT NULL, [Preco] float NOT NULL, CONSTRAINT [PK_ArtigoClientePreco] PRIMARY KEY ([IdArtigo],[IdCliente]), CONSTRAINT [FK_ArtigoClientePreco_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_ArtigoClientePreco_Cliente] FOREIGN KEY ([IdCliente]) REFERENCES [Cliente] ([IdCliente]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [ArtigoArtigoConcorrente] (  [IdArtigoConcorrente] uniqueidentifier NOT NULL, [IdArtigo] uniqueidentifier NOT NULL, [Descricao] nvarchar(100) NOT NULL COLLATE NOCASE, [Preco] float NOT NULL, [TipoEntidadeExterna] nvarchar(15) NULL COLLATE NOCASE, [EntidadeExternaId] uniqueidentifier NULL, CONSTRAINT [PK_ArtigoArtigoConcorrente_1] PRIMARY KEY ([IdArtigoConcorrente]), CONSTRAINT [FK_ArtigoArtigoConcorrente_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [ArtigoArtigoAssociado] (  [IdArtigo] uniqueidentifier NOT NULL, [IdArtigoAssociado] uniqueidentifier NOT NULL, CONSTRAINT [PK_ArtigoArtigoAssociado] PRIMARY KEY ([IdArtigo],[IdArtigoAssociado]), CONSTRAINT [FK_ArtigoArtigoAssociado_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [ArtigoAnexo] (  [IdArtigoAnexo] uniqueidentifier NOT NULL, [IdArtigo] uniqueidentifier NOT NULL, [Anexo] nvarchar(50) NOT NULL COLLATE NOCASE, [IdTipoAnexo] nvarchar(15) NOT NULL COLLATE NOCASE, CONSTRAINT [PK_ArtigoAnexo_1] PRIMARY KEY ([IdArtigoAnexo]), CONSTRAINT [FK_ArtigoAnexo_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_ArtigoAnexo_TipoAnexo] FOREIGN KEY ([IdTipoAnexo]) REFERENCES [TipoAnexo] ([IdTipoAnexo]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*//*
CREATE TABLE [TipoAnexo] (  [IdTipoAnexo] nvarchar(15) NOT NULL, [Descricao] nvarchar(50) NULL COLLATE NOCASE, CONSTRAINT [PK_TipoAnexo] PRIMARY KEY ([IdTipoAnexo]))
*/