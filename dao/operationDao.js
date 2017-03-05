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
            .insert(operation)
            .asCallback((err) => {
                callback(err);
            });
    },
    update: (operation, callback) => {
        knex(table)
            .update(operation)
            .where('id', operation.id)
            .asCallback((err, data) => {
                callback(err);
            });
    },
    delete: (operation, callback) => {
        knex(table)
            .del()
            .where('id', operation.id)
            .asCallback((err) => {
                callback(err);
            });
    },
    selectByUuid: (uuid, callback) => {
        knex(table)
            .where('uuid', uuid)
            .asCallback((err, operations) => {
                callback(err, operations[0]);
            });
    },
    selectBetweenDateByUserId: (userId, startDate, endDate, callback) => {
        knex(table)
            .where('userId', userId)
            .andWhereBetween('date', [startDate, endDate])
            .asCallback((err, operations) => {
                callback(err, operations);
            });
    }
}