export default class UserModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    findOne = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT IdUtilizador as id, Nome as name, Email as email, Password as password, Login as username, IdVendedorERP as id_seller, IdClienteERP as id_customer FROM Utilizador',
                    [],
                    (tx, results) => {
                        const data = results.rows.length > 0 ? results.rows.item(0) : { id: 0 };
                        resolve(data);
                    }
                );
            });
        });

    create = data =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM Utilizador',
                    [],
                    (tx, results) => {
                        console.log(results);
                        console.log(data);
                        tx.executeSql(
                            'INSERT INTO Utilizador (IdUtilizador, Login, Nome, Password, Email, IdVendedorERP, IdClienteERP) VALUES (?,?,?,?,?,?,?)',
                            [
                                data.IdUtilizador, 
                                data.Login, 
                                data.Nome, 
                                data.Password,
                                data.Email,
                                data.IdVendedorERP,
                                data.IdClienteERP
                            ],
                            (tx, results) => {
                                console.log(results);
                                resolve(results.insertId);
                            }
                        );
                    }
                );
            });
        });
}
