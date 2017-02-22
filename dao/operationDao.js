const knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: 'crumble.sqlite'
    },
    useNullAsDefault: true,
    debug: true
});

module.exports = {
    table: 'operation',
    insert: (operation, callback) => {
        knex('operations')
            .returning('id')
            .insert(operation)
            .then((data) => {
                callback(data[0]);
            })
            .catch(function (e) {
                console.error(e);
                callback(e);
            });
    },
}