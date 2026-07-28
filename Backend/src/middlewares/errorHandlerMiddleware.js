// Creating error handler middleware here which handles the error's
export const ErrorHandlerMiddleware = (err, req, res, next) => {
  ((err.message = err.message || "Internal Server Error!"),
    (err.statusCode = err.statusCode || 500));

  // Only log full error object/stack for real server errors (500+)
  // Client errors like 401/404 don't need noisy stack traces in console
  if (err.statusCode >= 500) {
    console.error(err);
  } else {
    console.warn(`ErrorHandler [${err.statusCode}]: ${err.message}`);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
