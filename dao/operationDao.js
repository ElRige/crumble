const knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: 'crumble.sqlite'
    },
    useNullAsDefault: true,
    debug: true
});

const table = 'operations';

module.exports = {
    insert: (operation, callback) => {
        knex(table)
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
    selectByUserId: (userId, startDate, endDate, callback) => {
        knex(table)
            .where('userId', userId)
            .andWhereBetween('date', [startDate, endDate])
            .asCallback((err, operations) => {
                callback(err, operations);
            });
    }
}