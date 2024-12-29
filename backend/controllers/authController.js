const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generatePassword = require('../utils/passwordGenerator');
const { sendWelcomeEmail } = require('../utils/emailSender');
const bcrypt = require('bcryptjs');
const { successResponse, errorResponse } = require('../utils/customResponse');

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const password = generatePassword();

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    await sendWelcomeEmail(email, firstName, password);

    return successResponse(res, 'User registered successfully.')

  } catch (err) {
    if (err.code === 11000) {
        return errorResponse(res, 'User with this email already exists', 400);
      }
    //res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    if (!user) return errorResponse(res,  'Invalid credentials.', 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res,  'Invalid credentials.', 404);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return successResponse(res, 'User LoggedIn successfully.', {token, user})

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
