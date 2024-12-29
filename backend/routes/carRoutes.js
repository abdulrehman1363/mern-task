const express = require('express');
const { createCar, getCars, getCar, updateCar, deleteCar, countCarsForUser } = require('../controllers/carController');
const { carValidation } = require('../validations/carValidations');
const authenticateUser = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validate');

const router = express.Router();

router.post('/',authenticateUser, validateRequest(carValidation), createCar);
router.get('/', authenticateUser, getCars);
router.get('/:id', authenticateUser, getCar);
router.put('/:id', authenticateUser, validateRequest(carValidation), updateCar);
router.delete('/:id',authenticateUser, deleteCar);
router.get('/count/:userId', authenticateUser, countCarsForUser)

module.exports = router;
