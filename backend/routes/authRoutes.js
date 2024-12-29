const express = require('express');
const { signup, login } = require('../controllers/authController');
const { signupSchema, loginSchema } = require('../validations/authValidation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema) ,login);

module.exports = router;
