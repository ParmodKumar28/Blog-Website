// Creating error handler middleware here which handles the error's
export const ErrorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  (err.message = err.message || "Internal Server Error!"),
    (err.statusCode = err.statusCode || 500),
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
};
