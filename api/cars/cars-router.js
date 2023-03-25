const express = require('express');
const router = express.Router();

const Cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkCarId, async (req, res, next) => {
  try {
    res.json(req.car);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
  try {
    const newCar = await Cars.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    next(err);
  }
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
