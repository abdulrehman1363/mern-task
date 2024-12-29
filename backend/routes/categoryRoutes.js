const express = require('express');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { categoryValidation } = require('../validations/categoryValidation');
const validateRequest = require('../middlewares/validate');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, validateRequest(categoryValidation), createCategory);
router.get('/', authenticateUser, getCategories);
router.get('/:id', authenticateUser, getCategory);
router.put('/:id', authenticateUser, validateRequest(categoryValidation), updateCategory);
router.delete('/:id', authenticateUser, deleteCategory);

module.exports = router;
