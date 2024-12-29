const Category = require('../models/Category');
const Car = require('../models/Car');
const { successResponse, errorResponse } = require('../utils/customResponse');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    const category = new Category({ name, user: userId });
    await category.save();

    return successResponse(res, 'Category created successfully', category);
  } catch (error) {
    if (error.code === 11000) {
      return errorResponse(res, 'Category with this name already exists for this user', 400);
    }
    return errorResponse(res, 'Failed to create category', 500, error);
  }
};

exports.getCategories = async (req, res) => {
    try {
      const userId = req.user._id;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const skip = (page - 1) * pageSize;
  
      const categories = await Category.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);
  
      const totalCategories = await Category.countDocuments({ user: userId });
  
      return successResponse(
        res,
        'Categories retrieved successfully',
        {
          categories,
          totalCategories,
          totalPages: Math.ceil(totalCategories / pageSize),
          currentPage: page,
        }
      );
    } catch (error) {
      return errorResponse(res, 'Failed to retrieve categories', 500, error);
    }
};
  exports.getCategory = async (req, res) => {
    try {
      const userId = req.user._id;
      const categoryId = req.params.id
  
      const category = await Category.findOne({ _id: categoryId, user: userId })
  
      return successResponse(
        res,
        'Category retrieved successfully',
        category
      );
    } catch (error) {
      return errorResponse(res, 'Failed to retrieve category', 500, error);
    }
};
  

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user._id;

    const category = await Category.findOneAndUpdate(
      { _id: id, user: userId },
      { name },
      { new: true, runValidators: true }
    );

    if (!category) return errorResponse(res, 'Category not found', 404);

    return successResponse(res, 'Category updated successfully', category);
  } catch (error) {
    return errorResponse(res, 'Failed to update category', 500, error);
  }
};

exports.deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;
  
      const carsWithCategory = await Car.find({ category: id });
  
      if (carsWithCategory.length > 0) {
        return errorResponse(res, 'Cannot delete category. Cars are associated with this category.', 400);
      }
  
      const category = await Category.findOneAndDelete({ _id: id, user: userId });
  
      if (!category) {
        return errorResponse(res, 'Category not found', 404);
      }
  
      return successResponse(res, 'Category deleted successfully', category);
    } catch (error) {
      return errorResponse(res, 'Failed to delete category', 500, error);
    }
};
