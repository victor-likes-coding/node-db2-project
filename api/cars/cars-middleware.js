const { object, number, string } = require('yup');
const { validate } = require('vin-validator');
const { getById, getByVin } = require('./cars-model');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;

  try {
    const car = await getById(id);
    if (!car) {
      next({
        status: 404,
        message: `car with id ${id} is not found`,
      });
      return;
    }
    req.car = car;
    next();
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  const carSchema = object({
    vin: string().required('vin is missing'),
    make: string().required('make is missing'),
    model: string().required('model is missing'),
    mileage: number().required('mileage is missing'),
    title: string(),
    transmission: string(),
  });

  try {
    await carSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  if (!validate(vin)) {
    return next({ status: 400, message: `vin ${vin} is invalid` });
  }

  next();
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;

  try {
    const amount = await getByVin(vin);
    if (amount > 0) {
      next({
        status: 400,
        message: `vin ${vin} already exists`,
      });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
