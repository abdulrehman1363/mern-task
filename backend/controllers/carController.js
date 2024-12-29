const Car = require('../models/Car');
const { successResponse, errorResponse } = require('../utils/customResponse');

exports.createCar = async (req, res) => {
  try {
    const { category, color, model, make, registrationNo } = req.body;

    const car = new Car({
      category,
      user: req.user.id,
      color,
      model,
      make,
      registrationNo,
    });

    await car.save();
    return successResponse(res, 'Car created successfully', car);
  } catch (error) {
    if (error.code === 11000) {
      return errorResponse(res, 'Registration number already exists', 400);
    }
    return errorResponse(res, 'Failed to create car', 500, error);
  }
};

exports.getCars = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const cars = await Car.find({ user: userId })
    .populate({
        path: 'category',
        select: 'name',
    })
    .select('color model make registrationNo category')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

    const totalCars = await Car.countDocuments({ user: userId });

    return successResponse(
        res,
        'Categories retrieved successfully',
        {
          cars,
          totalCars,
          totalPages: Math.ceil(totalCars / pageSize),
          currentPage: page,
        }
    );
  } catch (error) {
    return errorResponse(res, 'Failed to retrieve cars', 500, error);
  }
};

exports.getCar = async (req, res) => {
    try {
        const userId = req.user._id;
        const carId = req.params.id
    
        const car = await Car.findOne({ _id: carId, user: userId })
    
        return successResponse(
            res,
            'Car retrieved successfully',
            car
        );
    } catch (error) {
        return errorResponse(res, 'Failed to retrieve Car', 500, error);
    }
}

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, color, model, make, registrationNo } = req.body;

    const car = await Car.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { category, color, model, make, registrationNo },
      { new: true, runValidators: true }
    );

    if (!car) return errorResponse(res, 'Car not found or unauthorized', 404);
    return successResponse(res, 'Car updated successfully', car);
  } catch (error) {
    return errorResponse(res, 'Failed to update car', 500, error);
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findOneAndDelete({ _id: id, user: req.user.id });

    if (!car) return errorResponse(res, 'Car not found or unauthorized', 404);
    return successResponse(res, 'Car deleted successfully', car);
  } catch (error) {
    return errorResponse(res, 'Failed to delete car', 500, error);
  }
};

exports.countCarsForUser = async (req, res) => {
    try {
      const count = await Car.countDocuments({ user: req.user.id });
      return successResponse(res, 'Car count retrieved successfully', { count});
    } catch (error) {
      return errorResponse(res, 'Failed to retrieve car count', 500, error);
    }
  
}