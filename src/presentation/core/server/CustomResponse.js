class CustomResponse {
    constructor({
      success = false,
      errType = 0,
      msg = '',
      statusCode = 0,
      response = null,
      data = null,
    } = {}) {
      this.success = success;
      this.errType = errType;
      this.msg = msg;
      this.statusCode = statusCode;
      this.response = response;
      this.data = data;
    }
  }
  
 
  
  export default CustomResponse;
  
  