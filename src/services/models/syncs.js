export default class SyncModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    getContacts = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM contactos',
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


    getSalesoffHeader = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM LiqCab WHERE IdEstado ="FINALIZADO"',
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

    getSalesoffByHeader = (id) =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM LiqLin WHERE IdLiqCab = ?',
                    [id],
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

    getDocuments = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM VendaCab WHERE IdEstado ="FINALIZADO" OR FecharERP = 1',
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


    getProductsByDocument = document => new Promise((resolve, reject) => {
        this.db.transaction(tx => {

            tx.executeSql(
                'SELECT * FROM VendaLin v WHERE v.IdVendaCab = ?',
                [document],
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

    getCustomers = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM clientes ORDER BY id desc',
                    [],
                    (tx, results) => {
                        const data = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            console.log(results.rows.item(i));
                            data.push(results.rows.item(i));
                        }
                        resolve(data);
                    }
                );
            });
        });

    getProducts = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM artigos ORDER BY id desc',
                    [],
                    (tx, results) => {
                        const data = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            console.log(results.rows.item(i));
                            data.push(results.rows.item(i));
                        }
                        resolve(data);
                    }
                );
            });
        });

    getAllTables = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    "SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%' AND name <> 'Utilizador'",
                    [],
                    (tx, results) => {
                        const data = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            //console.log(results.rows.item(i));
                            data.push(results.rows.item(i));
                        }
                        resolve(data);
                    }
                );
            });
        });

    executeQuery = queries => {
        console.log('%c Execute Query', 'background: #222; color: #bada55; font-weight: bold; font-size: 16px;');
        return new Promise((resolve, reject) => {
            this.db.transaction(async (tx) => {
                for (let i = 0; i < queries.length; i++) {
                    await tx.executeSql(
                        queries[i],
                        [],
                        (tx, results) => {
                            resolve(results);
                        }
                    );
                }
            });

        });
    }


    downloadImages = data => { }
}