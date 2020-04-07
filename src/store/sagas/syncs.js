import { call, put, select } from 'redux-saga/effects';

import qs from 'qs';

import api from '~/services/api';
import apiBkp from '~/services/bkp';

import getToken from '~/services/token';

import SyncActions from '../ducks/syncs';

import { syncModel, userModel, Attachment } from '~/services/models/autoload';

export function* loadSync(data) {
    yield put(SyncActions.toggleSyncLoading(true));
    yield put(SyncActions.toggleSyncLoadingText('Sincronizando Registos'));
    console.log('%c Execute load Sync', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');
    let tables = {};

    try {

        for (let i = 0; i < data.data.length; i++) {
            switch (data.data[i]) {
                case 'attachments':
                    yield loadSyncFiles();
                    break;
                case 'documents':
                    tables.VendaCab = yield syncModel.getDocuments();
                    for (let i = 0; i < tables.VendaCab.length; i++) {
                        tables.VendaCab[i].linhas = yield syncModel.getProductsByDocument(tables.VendaCab[i].Id);
                    }
                    break;
                case 'salesoff':
                    tables.Liquidacao = yield syncModel.getSalesoffHeader();
                    for (let i = 0; i < tables.Liquidacao.length; i++) {
                        tables.Liquidacao[i].linhas = yield syncModel.getSalesoffByHeader(tables.Liquidacao[i].Id);
                    }
                    break;
            }
        }

        
        const IdVendedor = yield select(state => state.auth.user.id_seller);
        
        const response = yield call(api.post, 'BaseDados/SincCompleta', qs.stringify({
            IdPerfil: 'COMERCIAL',
            IdVendedor,
            DataUltimaSincronizacao: '2000-01-01',
            JSON: JSON.stringify(tables),
        }));
        
        // Executa migrations
        if (response.status == 200) {
            response.data[response.data.length] = "UPDATE Artigo SET IdIva = (SELECT Iva.IdIva FROM Iva where Iva.Taxa = Artigo.TaxaIva)";
            yield syncModel.executeQuery(response.data);
        }
        
    } catch (error) {
        
        yield put(SyncActions.loadSyncFailure());
    }
    yield put(SyncActions.toggleSyncLoading(false));
}

export function* loadSyncSchema() {
    console.log('%c Execute load Sync schema', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');
    yield put(SyncActions.toggleSyncLoading(true));
    yield put(SyncActions.toggleSyncLoadingText('Instalando base de dados.'));
    try {

        // Obtém as up_migrations de acordo com o perfil do utilizador
        const response = yield call(api.get, 'BaseDados');

        // Executa migrations
        if (response.status == 200) {
            console.log(response.data);
            yield syncModel.executeQuery(response.data);
        }
    } catch (error) {
        yield put(SyncActions.loadSyncFailure());
    }
    yield put(SyncActions.toggleSyncLoading(false));
}

export function* loadSyncBkp() {
    console.log('%c Execute load Sync Bkp', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');

    yield put(SyncActions.toggleSyncLoading(true));
    yield put(SyncActions.toggleSyncLoadingText('Recuperando BKP.'));
    try {

        const response = yield call(apiBkp.get, 'api.php');

        response.data[response.data.length] = " CREATE TRIGGER insert_venda_lin AFTER INSERT ON VendaLin BEGIN UPDATE VendaLin SET ValorIEC = IFNULL( (new.QuantidadeVenda + new.QuantidadeOferta) * ( CASE WHEN (SELECT VendaCab.IdTipoTransacao FROM VendaCab WHERE VendaCab.Id = new.IdVendaCab) = 'NORMAL' THEN (SELECT Artigo.ValorTaxa FROM Artigo WHERE Artigo.IdArtigo = new.IdArtigo) ELSE 0 END ), 0 ), TaxaIva = ( CASE WHEN (SELECT VendaCab.IdTipoTransacao FROM VendaCab WHERE VendaCab.Id = new.IdVendaCab) <> 'ENTREPOSTO' THEN (SELECT IFNULL(Artigo.TaxaIva,0) FROM Artigo WHERE Artigo.IdArtigo = new.IdArtigo) ELSE 0 END ), TotalLiquido = ((new.QuantidadeVenda*new.Preco)-((new.QuantidadeVenda*new.Preco)*(new.Desconto/100))) WHERE VendaLin.Id = new.Id; UPDATE VendaCab SET TotalMercadoria = (select SUM(Preco*QuantidadeVenda) from VendaLin WHERE VendaLin.IdVendaCab = new.IdVendaCab), TotalDesconto = (select SUM((Preco*QuantidadeVenda)*(Desconto/100)) from VendaLin WHERE VendaLin.IdVendaCab = new.IdVendaCab), TotalIVA = (select SUM(((Preco*QuantidadeVenda)-((Preco*QuantidadeVenda)*(Desconto/100))+ValorIEC)*(TaxaIva/100)) from VendaLin WHERE VendaLin.IdVendaCab = new.IdVendaCab), TotalIEC = IFNULL((select SUM(ValorIEC) from VendaLin WHERE VendaLin.IdVendaCab = new.IdVendaCab),0) WHERE VendaCab.Id = new.IdVendaCab; UPDATE VendaCab SET TotalDocumento = (TotalMercadoria-TotalDesconto+TotalIVA+TotalIEC) WHERE VendaCab.Id = new.IdVendaCab; END ";
        response.data[response.data.length] = " CREATE TRIGGER update_venda_cab AFTER UPDATE ON VendaCab WHEN new.IdTipoTransacao <> old.IdTipoTransacao BEGIN UPDATE VendaLin SET ValorIEC = (CASE WHEN new.IdTipoTransacao = 'NORMAL' THEN ValorIEC ELSE 0 END), TaxaIva = (CASE WHEN new.IdTipoTransacao <> 'ENTREPOSTO' THEN IFNULL(TaxaIva,0) ELSE 0 END) WHERE VendaLin.IdVendaCab = new.Id; UPDATE VendaCab SET TotalIVA = (select SUM(((Preco*QuantidadeVenda)-((Preco*QuantidadeVenda)*(Desconto/100))+ValorIEC)*(TaxaIva/100)) from VendaLin WHERE VendaLin.IdVendaCab = new.Id), TotalIEC = IFNULL((select SUM(ValorIEC) from VendaLin WHERE VendaLin.IdVendaCab = new.Id),0) WHERE VendaCab.Id = new.Id; UPDATE VendaCab SET TotalDocumento = (TotalMercadoria-TotalDesconto+TotalIVA+TotalIEC) WHERE VendaCab.Id = new.Id; END ";
        response.data[response.data.length] = " CREATE TRIGGER update_venda_lin AFTER UPDATE ON VendaLin BEGIN UPDATE VendaLin SET ValorIEC = IFNULL( (new.QuantidadeVenda + new.QuantidadeOferta) * ( CASE WHEN (SELECT VendaCab.IdTipoTransacao FROM VendaCab WHERE VendaCab.Id = old.IdVendaCab) = 'NORMAL' THEN (SELECT Artigo.ValorTaxa FROM Artigo WHERE Artigo.IdArtigo = old.IdArtigo) ELSE 0 END ), 0 ), TaxaIva = ( CASE WHEN (SELECT VendaCab.IdTipoTransacao FROM VendaCab WHERE VendaCab.Id = old.IdVendaCab) <> 'ENTREPOSTO' THEN (SELECT IFNULL(Artigo.TaxaIva,0) FROM Artigo WHERE Artigo.IdArtigo = old.IdArtigo) ELSE 0 END ), TotalLiquido = ((new.QuantidadeVenda*new.Preco)-((new.QuantidadeVenda*new.Preco)*(new.Desconto/100))) WHERE VendaLin.Id = new.Id; UPDATE VendaCab SET TotalMercadoria = (select SUM(Preco*QuantidadeVenda) from VendaLin WHERE VendaLin.IdVendaCab = old.IdVendaCab), TotalDesconto = (select SUM((Preco*QuantidadeVenda)*(Desconto/100)) from VendaLin WHERE VendaLin.IdVendaCab = old.IdVendaCab), TotalIVA = (select SUM(((Preco*QuantidadeVenda)-((Preco*QuantidadeVenda)*(Desconto/100))+ValorIEC)*(TaxaIva/100)) from VendaLin WHERE VendaLin.IdVendaCab = old.IdVendaCab), TotalIEC = IFNULL((select SUM(ValorIEC) from VendaLin WHERE VendaLin.IdVendaCab = old.IdVendaCab),0) WHERE VendaCab.Id = old.IdVendaCab; UPDATE VendaCab SET TotalDocumento = (TotalMercadoria-TotalDesconto+TotalIVA+TotalIEC) WHERE VendaCab.Id = old.IdVendaCab; END ";
        response.data[response.data.length] = " CREATE TRIGGER delete_venda_lin AFTER DELETE ON VendaLin BEGIN UPDATE VendaCab SET TotalMercadoria = (select SUM(Preco*QuantidadeVenda) from VendaLin WHERE VendaLin.IdVendaCab = old.IdVendaCab), TotalDesconto = (select SUM((Preco*QuantidadeVenda)*(Desconto/100)) from VendaLin WHERE VendaLin.IdVendaCab = old.IdVendaCab), TotalIVA = (select SUM(((Preco*QuantidadeVenda)-((Preco*QuantidadeVenda)*(Desconto/100))+ValorIEC)*(TaxaIva/100)) from VendaLin WHERE VendaLin.IdVendaCab = old.IdVendaCab), TotalIEC = IFNULL((select SUM(ValorIEC) from VendaLin WHERE VendaLin.IdVendaCab = old.IdVendaCab),0) WHERE VendaCab.Id = old.IdVendaCab; UPDATE VendaCab SET TotalDocumento = (TotalMercadoria-TotalDesconto+TotalIVA+TotalIEC) WHERE VendaCab.Id = old.IdVendaCab; END ";

        yield syncModel.executeQuery(response.data);

    } catch (error) {
        yield put(SyncActions.loadSyncFailure());
    }
    yield put(SyncActions.toggleSyncLoading(false));
}

export function* loadSyncComplete() {
    console.log('%c Execute load Sync Complete', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');
    //console.time();    

    yield loadSyncSchema();
    yield loadSyncFiles();
    yield loadSync({ data: [] });

    //yield loadSyncBkp();
    //yield loadSyncBkp();
    //console.timeEnd();
}

export function* loadSyncReset() {
    console.log('%c Execute load Sync Reset', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');
    yield put(SyncActions.toggleSyncLoading(true));
    yield put(SyncActions.toggleSyncLoadingText('Resetando aplicação'));
    try {

        const tables = yield syncModel.getAllTables();

        let queries = [];
        queries[0] = 'DELETE FROM Utilizador WHERE IdUtilizador IS NOT NULL';

        queries[queries.length] = "DROP TRIGGER IF EXISTS insert_venda_lin;";
        queries[queries.length] = "DROP TRIGGER IF EXISTS update_venda_cab;";
        queries[queries.length] = "DROP TRIGGER IF EXISTS update_venda_lin;";
        queries[queries.length] = "DROP TRIGGER IF EXISTS delete_venda_lin;";

        for (let i = 0; i < tables.length; i++) {
            queries[i + 1] = `DROP TABLE IF EXISTS ${tables[i].name}`;
        }
        
        // Executa migrations
        if (queries.length > 0) {
            yield syncModel.executeQuery(queries);
            const x = yield syncModel.getAllTables();
        }
    } catch (err) {
        yield put(SyncActions.loadSyncFailure());
    }
    yield put(SyncActions.toggleSyncLoading(false));
}

export function* loadSyncFiles() {
    console.log('%c Execute load Sync Files', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');

    yield put(SyncActions.toggleSyncLoading(true));
    yield put(SyncActions.toggleSyncLoadingText('Descarregando Imagens'));

    try {

        const nameFileZip = 'file.zip';
        const token = yield getToken();

        const processing = yield Promise.all([
            Attachment.unlink(Attachment.pathZip + nameFileZip),
            Attachment.unlink(Attachment.basePath + 'products/'),
            Attachment.downloadZip(token, nameFileZip,'TODOS'),
        ]).catch(erro => {
            console.log(erro.message);
        });

        console.log(processing);
    }
    catch (err) {
        console.log(err);
        yield put(SyncActions.loadSyncFailure());
    }

    yield put(SyncActions.toggleSyncLoading(false));
}