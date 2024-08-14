export const handleError = (error) => {
    if (error.response) {
      if (error.response.data.toString().includes("DOCTYPE") || error.response.data.toString().includes("<script>")) {
        return {
          errType: 1,
          msg: process.env.NODE_ENV === 'development' 
            ? `${error.response.data}`
            : 'Server error, please try again later',
          statusCode: error.response.status || 500,
          response: null,
        };
      }
  
      if (error.response.status === 401) {
        return {
          errType: 3,
          msg: error.response.data.message || '',
          statusCode: error.response.status || 401,
          response: error.response,
        };
      }
  
      try {
        const firstErrorMessage = Object.values(error.response.data.errors)[0][0];
        return {
          errType: 2,
          msg: firstErrorMessage,
          statusCode: error.response.status || 500,
          response: error.response,
        };
      } catch (e) {
        return {
          errType: 2,
          msg: error.response.data.message || 'Error occurred',
          statusCode: error.response.status || 500,
          response: error.response,
        };
      }
    } else if (error.code === 'ECONNABORTED') {
      return {
        errType: 0,
        msg: 'Connection timeout, check the quality of the internet',
        statusCode: 500,
        response: null,
      };
    } else {
      return {
        errType: 0,
        msg: 'No connection, check the quality of the internet',
        statusCode: 402,
        response: null,
      };
    }
  };