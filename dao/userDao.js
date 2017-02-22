const knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: 'crumble.sqlite'
    },
    useNullAsDefault: true
    //debug: true
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
    selectByEmail: (email, callback) => {
        knex(table)
            .where('email', email)
            .asCallback((err, users) => {
                callback(err, users[0]);
            });
    }
};