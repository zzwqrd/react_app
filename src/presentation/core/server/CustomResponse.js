class CustomResponse {
  constructor({
    success = false,
    errType = 0,
    msg = '',
    statusCode = 0,
    response = null,
    data = null,
  } = {}) {
    this.success = success;     // Boolean value to indicate if the request was successful
    this.errType = errType;     // Error type (could be used to categorize errors)
    this.msg = msg;             // Message describing the result or error
    this.statusCode = statusCode; // HTTP status code
    this.response = response;   // Full response object (useful for accessing headers, etc.)
    this.data = data;           // The data payload from the response
  }
}

// Example usage with a successful response
const successResponse = new CustomResponse({
  success: true,
  statusCode: 200,
  msg: 'Request completed successfully',
  data: { key: 'value' }, // Example data returned from the server
});

// Example usage with an error response
const errorResponse = new CustomResponse({
  success: false,
  errType: 1, // Example error type (e.g., network error, server error, etc.)
  msg: 'Failed to complete the request',
  statusCode: 500,
  response: { error: 'Internal Server Error' }, // Example error response from the server
});

export default CustomResponse;
