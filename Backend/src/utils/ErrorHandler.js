// Creating Error Handler class for custom error message's and status code here
class ErrorHandler extends Error {
  constructor(statusCode, error) {
    super(error);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export here
export default ErrorHandler;
