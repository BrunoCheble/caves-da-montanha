export default class AttendanceModel {
    static db;

    constructor(db) {
        this.db = db;
    }

    /*
    CREATE TABLE [EntidadeMoradaHorario] (  
        [IdMoradaHorario] uniqueidentifier NOT NULL, 
        [IdEntidadeMorada] uniqueidentifier NOT NULL, 
        [Dia] smallint NOT NULL, 
        [HoraInicio1] datetime NULL, 
        [HoraFim1] datetime NULL, 
        [HoraInicio2] datetime NULL, 
        [HoraFim2] datetime NULL, 
        [IdUtilizador] uniqueidentifier NULL, 
        [DataUltimaAtualizacao] datetime NULL, 
    )
    */
    create = data => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO EntidadeMoradaHorario (IdMoradaHorario, IdEntidadeMorada, Dia, HoraInicio1, HoraFim1, HoraInicio2, HoraFim2) VALUES (?,?,?,?,?,?,?)',
                [data.id, data.id_endereco, data.dia, data.manha_inicio, data.manha_fim, data.tarde_inicio, data.tarde_fim],
                (tx, results) => {
                    resolve(results.insertId);
                }
            );
        });
    });

    deleteAllByAdresse = id_adresse =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM EntidadeMoradaHorario WHERE IdEntidadeMorada = ?',
                    [id_adresse],
                    (tx, results) => {
                        resolve(results);
                    }
                );
            });
        });

    validateTime = time => {
        const [hour, minute] = time.split(":");
        return (time.length == 5 && parseInt(hour) < 24 && parseInt(minute) < 60);
    };

    validateAllIntervals = attendances => {

        for (let i = 0; i < attendances.length; i++) {

            let [dia, manha_inicio, manha_fim, tarde_inicio, tarde_fim] = attendances[i];
            dia = i;

            let interval_1 = this.validateInterval(manha_inicio, manha_fim);
            let interval_2 = this.validateInterval(tarde_inicio, tarde_fim);
            let all_empty = manha_inicio == '' && manha_fim == '' && tarde_inicio == '' && tarde_fim == '';

            if (all_empty == false) {
                if (!interval_1 || !interval_2) {
                    return false;
                }
            }
        }

        return true;
    };

    validateInterval = (start, end) => {
        return (start == '' && end == '') || (this.validateTime(start) && this.validateTime(end) && parseInt(start.replace(':', '')) < parseInt(end.replace(':', '')));
    };

    findOne = (id_adresse, day) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            const fields = [
                'IdEntidadeMorada as id_endereco',
                'Dia as dia',
                'HoraInicio1 as manha_inicio',
                'HoraFim1 as manha_fim',
                'HoraInicio2 as tarde_inicio',
                'HoraFim2 as tarde_fim',
            ];

            tx.executeSql(
                'SELECT ' + fields.join(', ') + ' FROM EntidadeMoradaHorario'
                + ' WHERE IdEntidadeMorada = ? AND Dia = ?',
                [id_adresse, day],
                (tx, results) => {
                    const data = results.rows.length == 1 ? results.rows.item(0) : { id_endereco: '', manha_inicio: '', manha_fim: '', tarde_inicio: '', tarde_fim: '' };
                    resolve(data);
                }
            );
        });
    });

    findAll = id_adresse =>
        new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                const fields = [
                    'IdEntidadeMorada as id_endereco',
                    'Dia as dia',
                    'HoraInicio1 as manha_inicio',
                    'HoraFim1 as manha_fim',
                    'HoraInicio2 as tarde_inicio',
                    'HoraFim2 as tarde_fim',
                ];

                tx.executeSql(
                    'SELECT ' + fields.join(', ') + ' FROM EntidadeMoradaHorario '
                    + ' WHERE IdEntidadeMorada = ?'
                    + ' ORDER BY Dia',
                    [id_adresse],
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

    getDefaultAttendances = attendances => {

        let default_attendances = [
            ['Segunda-feira', '', '', '', ''],
            ['Terça-feira', '', '', '', ''],
            ['Quarta-feira', '', '', '', ''],
            ['Quinta-feira', '', '', '', ''],
            ['Sexta-feira', '', '', '', ''],
            ['Sábado', '', '', '', ''],
            ['Domingo', '', '', '', '']
        ];

        console.log(attendances);

        for (let a = 0; a < attendances.length; a++) {
            let dia = attendances[a].dia;

            default_attendances[dia] = [
                default_attendances[dia][0],
                attendances[a].manha_inicio,
                attendances[a].manha_fim,
                attendances[a].tarde_inicio,
                attendances[a].tarde_fim,
            ];
        }

        console.log(default_attendances);

        return default_attendances;
    }
}