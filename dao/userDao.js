const knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: 'crumble.sqlite'
    },
    useNullAsDefault: true,
    debug: true
});

const table = 'users';

module.exports = {
    insert: (user, callback) => {
        knex(table)
            .insert(user)
            .asCallback((err, id) => {
                callback(err, id);
            });
    },
    selectPassword: (email, callback) => {
        knex.select('password')
            .from(table)
            .where('email', email)
            .asCallback((err, datas) => {
                callback(err, datas[0].password);
            });
    },
    selectByEmail: (email, callback) => {
        knex(table)
            .where('email', email)
            .asCallback((err, users) => {
                callback(err, users[0]);
            });
    },
    selectById: (id, callback) => {
        knex(table)
            .where('id', id)
            .asCallback((err, users) => {
                callback(err, users[0]);
            });
    }
};