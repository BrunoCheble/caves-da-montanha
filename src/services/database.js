import SQLite from 'react-native-sqlite-storage';
// SQLite.enablePromise(true);

export default class Database {
    static db;

    constructor() {
        if(this.db == null) {
            this.db = SQLite.openDatabase({
                name: 'test.db',
                createFromLocation: '~caves.db',
            });
        }
    }
}
