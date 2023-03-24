const /** @type {import('knex')} */ db = require('../../data/db-config');

exports.getAll = () => {
  // DO YOUR MAGIC
  return db('cars');
};

/**
 *
 * @param {int} id
 * @returns {Promise<Car>}
 */
exports.getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where({ id }).first();
};

/**
 * @param {{ vin: string, make: string, model: string, mileage: number, title?: string, transmission?: string }} car
 */

exports.create = (car) => {
  // DO YOUR MAGIC
  return db('cars')
    .insert(car)
    .then(([id]) => this.getById(id));
};

/**
 * @param {string} vin
 * @returns {Promise<int>}
 */

exports.getByVin = async (vin) => {
  return (await db('cars').where({ vin })).length;
};
