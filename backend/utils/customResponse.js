exports.successResponse = (res, message, data = null) => {
    return res.status(200).json({ success: true, message, data });
  };
  
  exports.errorResponse = (res, message, statusCode = 500, error = null) => {
    return res.status(statusCode).json({ success: false, message, error });
  };
  