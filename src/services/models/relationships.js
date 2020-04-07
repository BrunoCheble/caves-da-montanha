export default class RelationshipModel {

    static db;

    constructor(db) {
        this.db = db;
    }

    findExist = (id_contact, id_entity, typeEntity) => new Promise((resolve, reject) => {

        this.db.transaction(tx => {
            tx.executeSql(
                'SELECT IdContactoEntidade FROM ContactoEntidade WHERE IdContacto = ? AND IdEntidade = ? AND TipoEntidade = ?',
                [id_contact, id_entity, typeEntity],
                (tx, results) => {
                    resolve(results.rows.length);
                }
            );
        });
    });

    findAllTypeEntities = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {

                const fields = ['IdTipoEntidade as value', 'Descricao as label'];

                tx.executeSql(
                    ' SELECT ' + fields.join(', ') + ' FROM TipoEntidade',
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


    findAllTypeRelationships = () =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {

                const fields = ['IdTipoRelacaoContacto as value', 'Descricao as label'];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM TipoRelacaoContacto',
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

    create = data =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO ContactoEntidade (IdContactoEntidade, IdContacto, TipoEntidade, IdEntidade, TipoRelacaoContacto) VALUES (?,?,?,?,?)',
                    [data.id, data.id_contact, data.typeEntity, data.associate, data.typeRelationship],
                    (tx, results) => {
                        resolve(results.insertId);
                    }
                );
            });
        });

    delete = id =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM ContactoEntidade WHERE IdContactoEntidade = ?',
                    [id],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });

}
