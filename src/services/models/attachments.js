import serverUrl from '~/config/constants';

import RNFS from 'react-native-fs';
import RNBackgroundDownloader from 'react-native-background-downloader';

import { unzip } from 'react-native-zip-archive'

export default class AttachmentModel {

    static basePath;
    static pathZip;

    constructor() {
        this.basePath = RNFS.DocumentDirectoryPath + '/';
        this.pathZip = this.basePath + 'zips/';
    }

    extractZip = (filezip, destination) => new Promise((resolve, reject) => {
        unzip(this.pathZip + filezip, this.basePath + destination)
            .then((path) => {
                console.log(`unzip completed at ${path}`)
                resolve(true);
            })
            .catch((error) => {
                console.log(error)
                reject(new Error('Fail Unzip'));
            });
    });

    unlink = (dirfile) => new Promise((resolve, reject) => {
        RNFS.unlink(dirfile)
            .then(() => {
                console.log(dirfile + ' DELETED');
                resolve(true);
            })
            .catch((err) => {
                console.log(err.message);
                reject(new Error('Fail Remove ' + dirfile));
            });
    });

    downloadZip = (token, nameFileZip,tipoAnexo) =>
        new Promise((resolve, reject) => {
            RNBackgroundDownloader.download({
                id: 'file123',
                url: `${serverUrl}/api/BaseDados/GetAnexos?TipoAnexo=${tipoAnexo}`,
                headers: {
                    Authorization: 'Bearer ' + token
                },
                destination: this.pathZip + nameFileZip
            }).begin((expectedBytes) => {
                console.log(`${expectedBytes}`);
            })
                .progress((percent) => {
                    console.log(`Descarregando Imagens - ${percent * 100}%`);
                })
                .done(() => {
                    
                    console.log(`${serverUrl}/api/BaseDados/GetAnexos?TipoAnexo=${tipoAnexo}`);
                    console.log(token);
                    
                    console.log('Download is done!');
                    this.extractZip(nameFileZip, 'products/');
                    resolve(true);
                })
                .error((error) => {
                    console.log('Download canceled due to error: ', error);
                    reject(new Error('Fail Download ZIP'));
                });
        });

};

