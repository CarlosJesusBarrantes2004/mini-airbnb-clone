const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const validationErrors = Object.values(err.errors).map(
      (val) => val.message
    );
    return res.status(400).json({ success: false, errors: validationErrors });
  }

  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';

  return res.status(status).json({
    success: false,
    message,
  });
};

export default errorHandler;
