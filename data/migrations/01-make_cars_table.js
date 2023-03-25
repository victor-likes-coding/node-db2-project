/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.createTable('cars', (table) => {
    table.increments();
    table.string('vin', 17).unique().notNullable();
    table.string('make', 128).notNullable();
    table.string('model', 128).notNullable();
    table.integer('mileage').notNullable();
    table.string('title', 128);
    table.string('transmission', 128);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.dropTableIfExists('cars');
};
