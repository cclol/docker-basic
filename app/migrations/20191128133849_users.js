
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary()
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
