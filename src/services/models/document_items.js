export default class DocumentItemModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    findOneByProductAndDocument = (product, document) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'v.Id as id'
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM VendaLin v'
                + ' WHERE IdArtigo = ? AND IdVendaCab = ?',
                [product, document],
                (tx, results) => {
                    const data = results.rows.length == 1 ? results.rows.item(0) : null;
                    resolve(data);
                }
            );
        });
    });

    findAllByDocument = document => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                'v.Id as id',
                'v.IdArtigo as id_artigo',
                'v.IdIva as id_iva',
                'v.IdVendaCab as id_cab',
                'v.Preco as preco',
                'IFNULL(v.Desconto,0) as desconto',
                'v.QuantidadeOferta as oferta',
                'v.QuantidadeVenda as quantidade',
                'v.QuantidadePendente as pendente',
                'v.TaxaIva as taxaiva',
                'v.TotalLiquido as total',
                'v.ValorIEC as vl_iec',
                'a.ArtigoERP as codigo',
                'a.Descricao as nome',
                'a.PrecoCustoVendedor as preco_custo_vendedor',
                'a.PrecoTabela as preco_tabela',
                'a.PrecoConsumidorFinal as preco_consumidor_final',
                'a.PrecoHoreca as preco_horeca',
                'a.PrecoGarrafeira as preco_garrafeira',
                'a.PrecoCash as preco_cash',
                'a.PrecoDistribuidor as preco_distribuidor',
                'a.PrecoVendaGrandeSuperficie as preco_venda_grande_superfice',
                'a.PrecoTabela as preco_recomendado',
                '( (v.QuantidadeVenda * (v.Preco * (1-(IFNULL(v.Desconto,0)/100)) ) ) / ( v.QuantidadeOferta + v.QuantidadeVenda ) ) as pvm',
                '( (v.QuantidadeVenda * (v.Preco * (1-(IFNULL(v.Desconto,0)/100)) ) ) - ( v.QuantidadeVenda + v.QuantidadeOferta ) * a.PrecoCustoVendedor ) as totallucro'
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM VendaLin v'
                + ' JOIN Artigo a ON a.IdArtigo = v.IdArtigo'
                + ' WHERE v.IdVendaCab = ?',
                [document],
                (tx, results) => {
                    const data = [];

                    for (let i = 0; i < results.rows.length; i++) {

                        let item = results.rows.item(i);
                        if (item.desconto == 0) {
                            item.desconto = '';
                        }
                        if (item.oferta == 0) {
                            item.oferta = '';
                        }

                        data.push(item);
                    }

                    resolve(data);
                }
            );
        });
    });

    create = data => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO VendaLin (Id,IdVendaCab,IdArtigo,QuantidadeVenda,QuantidadePendente,QuantidadeOferta,Preco,Desconto,ValorIEC,IdIva,TaxaIva,TotalLiquido) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                [
                    data.id,
                    data.id_cab,
                    data.id_artigo,
                    data.quantidade,
                    (data.quantidade || 0) + (data.oferta || 0),
                    data.oferta,
                    data.preco,
                    data.desconto,
                    0,
                    data.id_iva,
                    0,
                    0
                ],
                (tx, results) => {
                    resolve(results.insertId);
                }
            );
        });
    });

    update = (data, id) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            if (data.quantidade > 0) {
                tx.executeSql(
                    'UPDATE VendaLin set QuantidadePendente = ?, QuantidadeVenda = ?, QuantidadeOferta = ?, Preco = ?, Desconto = ? WHERE Id = ?',
                    [(data.quantidade || 0) + (data.oferta || 0), data.quantidade, data.oferta, data.preco, data.desconto, id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            }
            else {
                tx.executeSql(
                    'DELETE FROM VendaLin WHERE id = ?',
                    [id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            }
        });
    });

    findAllSuggestiveProducts = id => new Promise((resolve, reject) => {

        let fields = [
            'a.IdArtigo as id',
            'a.IdArtigo as id_artigo',
            'a.IdIva as id_iva',
            'a.ArtigoERP as codigo',
            'a.Descricao as nome',
            'a.Imagem as imagem',
            'a.PrecoTabela as preco',
            'a.PrecoConsumidorFinal as preco_consumidor_final',
            'a.PrecoHoreca as preco_horeca',
            'a.PrecoGarrafeira as preco_garrafeira',
            'a.PrecoCash as preco_cash',
            'a.PrecoDistribuidor as preco_distribuidor',
            'a.PrecoVendaGrandeSuperficie as preco_venda_grande_superfice',
            'IFNULL(acp.Preco,0) as preco_especial',
            "c.IdTipoEntidadeExterna as id_tipo_cliente",
        ];

        const group_by = fields.map((field) => field.substring(field.indexOf(' as '), -1));

        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM VendaLin vl'
                + ' INNER JOIN ArtigoArtigoAssociado aa ON vl.IdArtigo = aa.IdArtigo'
                + ' INNER JOIN Artigo a ON aa.IdArtigoAssociado = a.IdArtigo'
                + ' INNER JOIN VendaCab vc ON vc.Id = vl.IdVendaCab'
                + ' INNER JOIN Cliente c ON c.IdCliente = vc.IdCliente'
                + ' LEFT JOIN ArtigoClientePreco acp ON a.IdArtigo = acp.IdArtigo AND acp.IdCliente = vc.IdCliente'
                + ' WHERE vc.Id = ?'
                + ' GROUP BY ' + group_by.join(', '),
                [id],
                (tx, results) => {
                    let data = [];
                    for (let i = 0; i < results.rows.length; i++) {

                        let item = results.rows.item(i);

                        switch (item.id_tipo_cliente) {
                            case 'Consumidor Final':
                                item.preco = item.preco_consumidor_final;
                                break;
                            case 'Garrafeira':
                                item.preco = item.preco_garrafeira;
                                break;
                            case 'Cash':
                                item.preco = item.preco_cash;
                                break;
                            case 'HORECA':
                                item.preco = item.preco_horeca;
                                break;
                            case 'Distribuidor':
                                item.preco = item.preco_distribuidor;
                                break;
                            case 'Grande Superficie':
                                item.preco = item.preco_venda_grande_superfice;
                                break;
                        }

                        if (item.preco_especial != 0) {
                            item.preco = item.preco_especial;
                        }

                        data.push(item);
                    }

                    data.sort((a, b) => (a.preco_recomendado > b.preco_recomendado) ? -1 : 1);

                    resolve(data.slice(0, 3));
                }
            );
        });
    });

    findAllSuggestiveProductsByCustomer = (id_customer, id_document, ignore) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            let fields = [
                'a.IdArtigo as id',
                'a.IdArtigo as id_artigo',
                'a.IdIva as id_iva',
                'a.ArtigoERP as codigo',
                'a.Descricao as nome',
                'a.Imagem as imagem',
                'a.PrecoTabela as preco',
                'a.PrecoConsumidorFinal as preco_consumidor_final',
                'a.PrecoHoreca as preco_horeca',
                'a.PrecoGarrafeira as preco_garrafeira',
                'a.PrecoCash as preco_cash',
                'a.PrecoDistribuidor as preco_distribuidor',
                'a.PrecoVendaGrandeSuperficie as preco_venda_grande_superfice',
                'IFNULL(acp.Preco,0) as preco_especial',
                "c.IdTipoEntidadeExterna as id_tipo_cliente",
            ];

            const group_by = fields.map((field) => field.substring(field.indexOf(' as '), -1));

            tx.executeSql(
                'SELECT SUM(vl.QuantidadeVenda) as qtd, ' + fields.join(', ') + ' FROM VendaLin vl'
                + ' JOIN Artigo a ON a.IdArtigo = vl.IdArtigo'
                + ' JOIN VendaCab vc ON vc.Id = vl.IdVendaCab'
                + ' LEFT JOIN ArtigoClientePreco acp ON a.IdArtigo = acp.IdArtigo AND acp.IdCliente = vc.IdCliente'
                + ' JOIN Cliente c ON c.IdCliente = vc.IdCliente'
                + " WHERE vc.Id <> ? AND vc.IdCliente = ? AND a.IdArtigo NOT IN ('" + ignore.join("', '") + "')"
                + ' GROUP BY ' + group_by.join(', ') + ' ORDER BY qtd DESC LIMIT 3'
                ,
                [id_document, id_customer],
                (tx, results) => {
                    const data = [];

                    for (let i = 0; i < results.rows.length; i++) {

                        let item = results.rows.item(i);

                        switch (item.id_tipo_cliente) {
                            case 'Consumidor Final':
                                item.preco = item.preco_consumidor_final;
                                break;
                            case 'Garrafeira':
                                item.preco = item.preco_garrafeira;
                                break;
                            case 'Cash':
                                item.preco = item.preco_cash;
                                break;
                            case 'HORECA':
                                item.preco = item.preco_horeca;
                                break;
                            case 'Distribuidor':
                                item.preco = item.preco_distribuidor;
                                break;
                            case 'Grande Superficie':
                                item.preco = item.preco_venda_grande_superfice;
                                break;
                        }

                        if (item.preco_especial != 0) {
                            item.preco = item.preco_especial;
                        }

                        data.push(item);
                    }

                    data.sort((a, b) => (a.preco > b.preco) ? -1 : 1);

                    resolve(data.slice(0, 3));
                }
            );
        });
    });

    deleteAllByDocument = id =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM VendaLin WHERE IdVendaCab = ?',
                    [id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });
    
}
/*
CREATE TABLE [VendaLin] (
    [Id] uniqueidentifier NOT NULL,
    [IdVendaCab] uniqueidentifier NOT NULL,
    [IdArtigo] uniqueidentifier NOT NULL,
    [QuantidadeVenda] float NOT NULL,
    [QuantidadeOferta] float NOT NULL,
    [Preco] float NOT NULL,  (sem descontos e sem taxas)
    [Desconto] float NOT NULL, (percentual)
    [ValorIEC] float NOT NULL, (valor total do IEC)
    [IdIva] uniqueidentifier NOT NULL,
    [TaxaIva] float NOT NULL, (percentual)
    [TotalLiquido] float NOT NULL (percentual)

    , CONSTRAINT [PK_VendaLin] PRIMARY KEY ([Id]), CONSTRAINT [FK_VendaLin_Artigo] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaLin_Iva] FOREIGN KEY ([IdIva]) REFERENCES [Iva] ([IdIva]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaLin_VendaCab] FOREIGN KEY ([IdVendaCab]) REFERENCES [VendaCab] ([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION)
CREATE TABLE [VendaIndiretaLin] (  [IdCab] uniqueidentifier NOT NULL, [Id] uniqueidentifier NOT NULL, [IdArtigo] uniqueidentifier NOT NULL, [QuantidadeVenda] float NOT NULL, [QuantidadeOferta] float NOT NULL, [Preco] float NOT NULL, [Acordo] bit NULL, [Promocao] bit NULL, [ArtigoEmCarta] bit NULL, [ArtigoServico] bit NULL, CONSTRAINT [PK_VendaIndiretaLin] PRIMARY KEY ([IdCab],[Id]), CONSTRAINT [FK_VendaIndiretaLin_Artigo1] FOREIGN KEY ([IdArtigo]) REFERENCES [Artigo] ([IdArtigo]) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT [FK_VendaIndiretaLin_VendaIndiretaCab1] FOREIGN KEY ([IdCab]) REFERENCES [VendaIndiretaCab] ([IdCab]) ON DELETE NO ACTION ON UPDATE NO ACTION)
*/