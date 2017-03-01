const knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: 'crumble.sqlite'
    },
    useNullAsDefault: true,
    debug: true
});

const table = 'autologin';

module.exports = {
    insert: (autologinToken, callback) => {
        knex(table)
            .insert(autologinToken)
            .asCallback((err) => {
                callback(err);
            });
    },
    selectByToken: (token, callback) => {
        knex(table)
            .where('token', token)
            .asCallback((err, autologinToken) => {
                callback(err, autologinToken[0]);
            });
    },
    delete: (token, callback) => {
        knex(table)
            .delete()
            .where('token', token)
            .asCallback((err) => {
                callback(err);
            });
    }
};