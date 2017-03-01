const fs = require('fs');
const file = 'crumble.sqlite';
const knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: file
    },
    useNullAsDefault: true,
    debug: true
});

module.exports = () => {
    let exists = fs.existsSync(file);
    if (!exists) {
        knex.schema
            .createTableIfNotExists('users', function (table) {
                table.increments('id');
                table.uuid('uuid').notNullable();
                table.string('username').notNullable();
                table.string('email').notNullable().unique();
                table.string('password').notNullable();
            })
            .createTableIfNotExists('operations_type', function (table) {
                table.increments('id');
                table.integer('userId');
                table.foreign('userId').references('users.id');
                table.string('type');
            })
            .createTableIfNotExists('operations', function (table) {
                table.increments('id');
                table.uuid('uuid').notNullable();
                table.integer('userId').notNullable();
                table.foreign('userId').references('users.id');
                table.string('label').notNullable();
                table.string('type').notNullable();
                table.date('date').notNullable();
                table.integer('amount').notNullable();
            })
            .createTableIfNotExists('autologin', function (table) {
                table.increments('id');
                table.integer('userId').notNullable();
                table.foreign('userId').references('users.id');
                table.uuid('token').notNullable();
            })
            .catch(function (e) {
                console.error(e);
            });
    }
};